# Day 9: EchoMart - E-Commerce Voice Shopping Assistant

Welcome to **Day 9** of the AI Voice Agents Challenge! Today we're building **EchoMart**, a complete voice-powered e-commerce shopping assistant that lets users browse products, add items to cart, and place orders entirely through voice commands.

## 🎯 Challenge Overview

Build a voice shopping assistant that:
- Helps users browse products by category, price, and color
- Provides natural product recommendations
- Manages shopping cart through voice commands
- Collects delivery information conversationally
- Places orders and provides confirmation

## ✨ Features

### Voice Shopping Experience
- **Natural Product Discovery**: "Show me hoodies under 1500"
- **Smart Filtering**: Browse by category, color, and price
- **Voice Cart Management**: Add items with size selection
- **Conversational Checkout**: Collect name, address, and delivery instructions
- **Order Confirmation**: Real-time order tracking and confirmation

### Professional UI
- **Animated Landing Page**: Modern SaaS-style welcome page with animated shopping trolley
- **Real-time Cart Widget**: Live cart updates during conversation
- **Order Receipt Modal**: Beautiful order confirmation with download option
- **Dark Theme Chat Interface**: Professional voice interaction UI
- **Responsive Design**: Works seamlessly on desktop and mobile

## 📁 Project Structure

```
Day9/
├── backend/
│   ├── src/
│   │   ├── agent.py          # Main voice agent with shopping logic
│   │   └── merchant.py       # Product catalog and order management
│   ├── catalog.json          # Product database
│   ├── orders.json           # Order history
│   └── .env.local            # Environment configuration
├── frontend/
│   ├── components/
│   │   ├── app/
│   │   │   ├── welcome-view.tsx      # Animated landing page
│   │   │   ├── session-view.tsx      # Voice chat interface
│   │   │   ├── cart-drawer.tsx       # Shopping cart UI
│   │   │   └── order-receipt-modal.tsx  # Order confirmation
│   │   └── ecommerce/
│   │       └── product-card.tsx      # Product display components
│   ├── hooks/
│   │   └── useCartTracking.ts        # Real-time cart tracking
│   └── .env.local            # Frontend configuration
└── README.md                 # This file
```

## 🛠️ Technology Stack

### Backend
- **LiveKit Agents**: Real-time voice agent framework
- **Murf Falcon TTS**: Ultra-fast text-to-speech (matthew voice)
- **Google Gemini 2.5 Flash**: LLM for conversation intelligence
- **AssemblyAI**: Speech-to-text transcription
- **Python 3.12**: Backend runtime

### Frontend
- **Next.js 15**: React framework with Turbopack
- **LiveKit Components React**: Real-time voice UI
- **Tailwind CSS**: Styling and animations
- **Framer Motion**: Smooth animations
- **TypeScript**: Type-safe development

## 🎨 Key Components

### Agent Intelligence (`agent.py`)
The voice agent includes three main function tools:

1. **`browse_catalog`**: Search and filter products
   - Category filtering (mugs, hoodies, t-shirts, caps, bags)
   - Color filtering
   - Price range filtering
   - Natural language query parsing

2. **`create_new_order`**: Place orders with validation
   - Product ID resolution
   - Size selection for apparel
   - Quantity management
   - Order confirmation

3. **`save_customer_info`**: Collect delivery details
   - Customer name
   - Delivery address
   - Special instructions

### Product Catalog (`merchant.py`)
- 20 products across 5 categories
- Price range: ₹349 - ₹1,799
- Multiple colors and sizes
- JSON-based storage for easy modification

### Real-time Cart Tracking (`useCartTracking.ts`)
- Parses agent messages to track cart state
- Updates UI in real-time
- Handles order placement
- Manages order history

## 🚀 Quick Start

### Prerequisites

- **Python 3.12+** with [uv](https://docs.astral.sh/uv/) package manager
- **Node.js 18+** with pnpm
- **LiveKit Server** (install via `brew install livekit` on macOS)
- **API Keys**:
  - Murf API Key (for Falcon TTS)
  - Google API Key (for Gemini LLM)
  - AssemblyAI API Key (for STT)
  - LiveKit credentials (Cloud or self-hosted)

### 1. Navigate to Day 9

```bash
cd Day9
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
uv sync

# Copy environment file and configure
cp .env.example .env.local

# Edit .env.local with your credentials:
# - LIVEKIT_URL
# - LIVEKIT_API_KEY
# - LIVEKIT_API_SECRET
# - MURF_API_KEY (for Falcon TTS)
# - GOOGLE_API_KEY (for Gemini LLM)
# - DEEPGRAM_API_KEY (for Deepgram STT)

# Download required models
uv run python src/agent.py download-files
```

For LiveKit Cloud users, you can automatically populate credentials:

```bash
lk cloud auth
lk app env -w -d .env.local
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Copy environment file and configure
cp .env.example .env.local

# Edit .env.local with the same LiveKit credentials
```

### 4. Run the Application

#### Option A: Use the convenience script

```bash
chmod +x start_app.sh
./start_app.sh
```

This starts all three services automatically.

#### Option B: Run services individually

```bash
# Terminal 1 - LiveKit Server
livekit-server --dev

# Terminal 2 - Backend Agent
cd backend
uv run python src/agent.py dev

# Terminal 3 - Frontend
cd frontend
pnpm dev
```

### 5. Start Shopping!

1. Open http://localhost:3000
2. Click "START CALL"
3. Try these voice commands:
   - "Show me hoodies"
   - "I want a black cap"
   - "Show me products under 1000"
   - "I'll take the first one in size M"
   - "What's in my cart?"

## 💬 Example Conversations

### Browse Products
```
User: "Show me hoodies"
Agent: "I found 4 products:
        Number 1, Black Logo Hoodie, 1499 rupees, available in sizes S, M, L, XL
        Number 2, Grey Zip Hoodie, 1799 rupees, available in sizes S, M, L, XL
        ..."
```

### Add to Cart
```
User: "I want the black hoodie in size L"
Agent: "Great! You want 1 Black Logo Hoodie in size L. That will be 1499 rupees. 
        Should I add this to your cart?"
User: "Yes, add it"
Agent: "Perfect! I've added Black Logo Hoodie to your cart for 1499 rupees. 
        Would you like to see more products or complete your order?"
```

### Complete Order
```
User: "Complete my order"
Agent: "Would you like to complete your order?"
User: "Yes"
Agent: "What's your full name?"
User: "John Doe"
Agent: "What's your delivery address?"
User: "123 Main Street, Mumbai"
Agent: "Any special delivery instructions?"
User: "Leave at the door"
Agent: "Great! I have your order for Black Logo Hoodie being delivered to 
        John Doe at 123 Main Street, Mumbai. Your order is confirmed!"
```

## 🎯 Challenge Objectives Completed

✅ **Voice-First Shopping**: Complete product browsing through voice  
✅ **Smart Product Search**: Filter by category, color, and price  
✅ **Natural Conversation**: Context-aware responses and confirmations  
✅ **Cart Management**: Real-time cart tracking and updates  
✅ **Order Processing**: Full checkout flow with delivery info collection  
✅ **Professional UI**: Modern, animated landing page and chat interface  
✅ **Real-time Updates**: Live cart widget and order confirmations  

## 🎨 UI Features

### Landing Page
- Animated shopping trolley with floating items
- Background trolleys moving across the screen
- Smooth fade-in animations for all elements
- Interactive category chips with hover effects
- Professional SaaS-style design

### Chat Interface
- Dark gradient background
- EchoMart branding
- Real-time cart status widget
- Last order button
- Order receipt modal with download option
- Smooth transitions and animations

## 📝 Customization Guide

### Add New Products

Edit `backend/catalog.json`:

```json
{
  "id": "product-id",
  "name": "Product Name",
  "description": "Product description",
  "price": 999,
  "currency": "INR",
  "category": "category-name",
  "color": "color-name",
  "sizes": ["S", "M", "L", "XL"]
}
```

### Modify Agent Behavior

Edit `backend/src/agent.py`:
- Update the `instructions` in `__init__` method
- Modify function tools for custom logic
- Add new tools for additional features

### Customize UI Theme

Edit `frontend/components/app/welcome-view.tsx`:
- Change color scheme (indigo → your brand color)
- Modify animations
- Update branding text

## 🐛 Troubleshooting

### Agent not responding
- Check that all three services are running
- Verify API keys in `.env.local` files
- Check browser console for errors

### Cart not updating
- Ensure agent is using correct product IDs
- Check browser console for cart tracking logs
- Verify message parsing in `useCartTracking.ts`

### Audio issues
- Allow microphone permissions in browser
- Check audio device selection in UI
- Verify LiveKit server is running

## 📚 Documentation & Resources

- [Murf Falcon TTS](https://murf.ai/api/docs/text-to-speech/streaming)
- [LiveKit Agents](https://docs.livekit.io/agents)
- [Google Gemini](https://ai.google.dev/gemini-api/docs)
- [AssemblyAI](https://www.assemblyai.com/docs)
- [Next.js 15](https://nextjs.org/docs)

## 🎓 What You Learned

- Building e-commerce voice agents
- Function calling with multiple tools
- Real-time UI updates from voice conversations
- Cart state management
- Conversational checkout flows
- Professional UI/UX for voice applications
- Animation and transitions in React

## 🚀 Next Steps

Enhance your EchoMart agent:
- Add payment processing integration
- Implement product recommendations
- Add order tracking
- Support multiple languages
- Add product images and reviews
- Implement inventory management
- Add promotional codes and discounts

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Built for the **AI Voice Agents Challenge** by [murf.ai](https://murf.ai)

Powered by:
- LiveKit Agents
- Murf Falcon TTS
- Google Gemini
- AssemblyAI

---

**Day 9 Complete!** 🎉 You've built a fully functional voice shopping assistant!

Share your implementation on LinkedIn and tag @murf.ai!
