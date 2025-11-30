import logging
from typing import Optional

from dotenv import load_dotenv
from merchant import list_products, create_order, get_last_order
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
    tokenize,
    function_tool,
    RunContext
)
from livekit.plugins import murf, silero, google, deepgram, assemblyai, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env")


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a friendly voice shopping assistant for EchoMart, an e-commerce store. The user is interacting with you via voice.
            
            GREETING: When you first greet the user, say: "Hello! Welcome to EchoMart. I can help you find mugs, hoodies, t-shirts, caps, and bags. What would you like to see today?"
            
            BROWSING PRODUCTS:
            - Always use the browse_catalog tool to show available products - never invent products or prices
            - When listing products, be clear and concise. Say: "I found [number] products:" then list each one
            - For each product, say: "Number [1/2/3], [Product Name], [Price] rupees, available in sizes [sizes]"
            - Example: "Number 1, Black Logo Hoodie, 1499 rupees, available in sizes S, M, L, XL"
            - After listing products, ALWAYS ask: "Which one would you like?"
            
            PLACING ORDERS:
            - When user selects a product, ask for size if applicable: "What size would you like?"
            - Then confirm: "Great! You want [quantity] [product name] in size [size]. That will be [price] rupees. Should I add this to your cart?"
            - After confirmation, use create_new_order tool with the product ID (like hoodie-001)
            - After placing order, say: "Perfect! I've added [product name] to your cart for [price] rupees. Would you like to see more products or complete your order?"
            
            COLLECTING DELIVERY INFORMATION:
            - After ALL products are selected and user is done shopping, ask: "Would you like to complete your order?"
            - Then collect in this order:
              1. "What's your full name?"
              2. "What's your delivery address?"
              3. "Any special delivery instructions?"
            - Confirm all details: "Great! I have your order for [items] being delivered to [name] at [address]. Your order is confirmed!"
            
            IMPORTANT RULES:
            - Use product IDs for orders: hoodie-001, tshirt-002, mug-003, cap-001, bag-002
            - Never repeat the same product multiple times in one response
            - Keep responses natural and conversational for voice
            - No emojis, asterisks, or complex formatting
            - Be brief - this is voice, not text chat
            
            Product categories: mugs, hoodies, t-shirts, caps, bags""",
        )
        self.last_products = []  # Track last shown products
        self.customer_info = {}  # Track customer delivery info

    @function_tool
    async def browse_catalog(
        self,
        context: RunContext,
        search_query: str,
    ):
        """Browse the product catalog based on user's search query.
        
        Use this tool whenever the user wants to see products. Parse their request and extract:
        - category (mug, hoodie, tshirt, cap, bag)
        - price limit if mentioned
        - color if mentioned
        
        Args:
            search_query: The user's search request (e.g., "hoodies", "black caps", "bags under 2000")
        """
        logger.info(f"Browsing catalog with query: {search_query}")
        
        # Parse the query
        query_lower = search_query.lower()
        filters = {}
        
        # Extract category
        if "mug" in query_lower or "cup" in query_lower:
            filters["category"] = "mug"
        elif "hoodie" in query_lower:
            filters["category"] = "hoodie"
        elif "tshirt" in query_lower or "t-shirt" in query_lower or "tee" in query_lower or "shirt" in query_lower:
            filters["category"] = "tshirt"
        elif "cap" in query_lower or "hat" in query_lower:
            filters["category"] = "cap"
        elif "bag" in query_lower:
            filters["category"] = "bag"
        
        # Extract color
        colors = ["black", "white", "blue", "grey", "gray", "red", "brown", "green", "navy"]
        for color in colors:
            if color in query_lower:
                filters["color"] = color if color != "gray" else "grey"
                break
        
        # Extract price limit
        import re
        price_match = re.search(r'under\s+(\d+)', query_lower)
        if price_match:
            filters["max_price"] = int(price_match.group(1))
        
        products = list_products(filters if filters else None)
        
        if not products:
            return "No products found matching those criteria."
        
        # Store products for reference
        self.last_products = products
        
        # Format products for the LLM with product IDs
        result = f"Found {len(products)} product(s):\n"
        for idx, product in enumerate(products, 1):
            sizes = f", sizes: {', '.join(product['sizes'])}" if "sizes" in product else ""
            result += f"{idx}. {product['name']} (ID: {product['id']}) - {product['description']} - {product['currency']} {product['price']}{sizes}\n"
        
        return result

    @function_tool
    async def create_new_order(
        self,
        context: RunContext,
        product_identifier: str,
        quantity: int = 1,
        size: Optional[str] = None,
    ):
        """Place an order for a product.
        
        Use this tool when the user confirms they want to buy a product.
        
        Args:
            product_identifier: The product ID (e.g., "hoodie-001") OR product name (e.g., "Black Logo Hoodie") OR index number (e.g., "1" for first product shown)
            quantity: Number of items to order (default: 1)
            size: Size for apparel items (S, M, L, XL)
        """
        logger.info(f"Creating order: product_identifier={product_identifier}, quantity={quantity}, size={size}")
        
        # Try to resolve product_identifier to actual product_id
        product_id = product_identifier
        
        # Check if it's an index number
        if product_identifier.isdigit():
            idx = int(product_identifier) - 1
            if 0 <= idx < len(self.last_products):
                product_id = self.last_products[idx]["id"]
                logger.info(f"Resolved index {product_identifier} to product_id: {product_id}")
        
        # Check if it's a product name - search in last shown products first
        elif not product_identifier.startswith(("mug-", "hoodie-", "tshirt-", "cap-", "bag-")):
            # Search in last shown products
            for product in self.last_products:
                if product["name"].lower() == product_identifier.lower():
                    product_id = product["id"]
                    logger.info(f"Resolved name '{product_identifier}' to product_id: {product_id}")
                    break
            else:
                # Search in all products
                all_products = list_products()
                for product in all_products:
                    if product["name"].lower() == product_identifier.lower():
                        product_id = product["id"]
                        logger.info(f"Resolved name '{product_identifier}' to product_id: {product_id}")
                        break
        
        try:
            line_items = [
                {
                    "product_id": product_id,
                    "quantity": quantity,
                    "size": size,
                }
            ]
            
            order = create_order(line_items)
            
            # Format order confirmation
            result = f"Order {order['id']} created successfully!\n"
            for item in order["items"]:
                size_info = f" (size {item['size']})" if item.get("size") else ""
                result += f"- {item['quantity']} x {item['product_name']}{size_info}: {order['currency']} {item['line_total']}\n"
            result += f"Total: {order['currency']} {order['total']}"
            
            return result
        except Exception as e:
            logger.error(f"Error creating order: {e}")
            return f"Sorry, I couldn't create the order: {str(e)}"

    @function_tool
    async def get_order_history(self, context: RunContext):
        """Check the most recent order.
        
        Use this tool when the user asks what they just bought or about their last order.
        """
        logger.info("Checking last order")
        
        order = get_last_order()
        
        if not order:
            return "You haven't placed any orders yet."
        
        # Format order details
        result = f"Your last order ({order['id']}):\n"
        for item in order["items"]:
            size_info = f" (size {item['size']})" if item.get("size") else ""
            result += f"- {item['quantity']} x {item['product_name']}{size_info}: {order['currency']} {item['line_total']}\n"
        result += f"Total: {order['currency']} {order['total']}\n"
        result += f"Placed at: {order['created_at']}"
        
        return result

    @function_tool
    async def save_customer_info(
        self,
        context: RunContext,
        name: str,
        address: str,
        delivery_instructions: str = "",
    ):
        """Save customer delivery information.
        
        Use this tool after collecting the customer's name, address, and delivery instructions.
        
        Args:
            name: Customer's full name
            address: Delivery address
            delivery_instructions: Special delivery instructions (optional)
        """
        logger.info(f"Saving customer info: name={name}, address={address}")
        
        self.customer_info = {
            "name": name,
            "address": address,
            "delivery_instructions": delivery_instructions,
        }
        
        return f"Customer information saved: {name}, {address}"


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Set up a voice AI pipeline using AssemblyAI, Google Gemini, Murf, and the LiveKit turn detector
    session = AgentSession(
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # See all available models at https://docs.livekit.io/agents/models/stt/
        stt=assemblyai.STT(),
        # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
        # See all available models at https://docs.livekit.io/agents/models/llm/
        llm=google.LLM(
                model="gemini-2.5-flash",
            ),
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
        tts=murf.TTS(
                voice="en-US-matthew", 
                style="Conversation",
                tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
                text_pacing=True
            ),
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    # To use a realtime model instead of a voice pipeline, use the following session setup instead.
    # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    # 1. Install livekit-agents[openai]
    # 2. Set OPENAI_API_KEY in .env.local
    # 3. Add `from livekit.plugins import openai` to the top of this file
    # 4. Use the following session setup instead of the version above
    # session = AgentSession(
    #     llm=openai.realtime.RealtimeModel(voice="marin")
    # )

    # Metrics collection, to measure pipeline performance
    # For more information, see https://docs.livekit.io/agents/build/metrics/
    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # # Add a virtual avatar to the session, if desired
    # # For other providers, see https://docs.livekit.io/agents/models/avatar/
    # avatar = hedra.AvatarSession(
    #   avatar_id="...",  # See https://docs.livekit.io/agents/models/avatar/plugins/hedra
    # )
    # # Start the avatar and wait for it to join
    # await avatar.start(session, room=ctx.room)

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            # For telephony applications, use `BVCTelephony` for best results
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    # Join the room and connect to the user
    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
