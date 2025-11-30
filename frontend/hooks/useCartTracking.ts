'use client';

import { useState, useEffect } from 'react';
import type { ReceivedChatMessage } from '@livekit/components-react';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface LastOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  total: number;
}

export function useCartTracking(messages: ReceivedChatMessage[]) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [pendingItem, setPendingItem] = useState<CartItem | null>(null);
  const [processedMessageCount, setProcessedMessageCount] = useState(0);

  useEffect(() => {
    // Only process if we have new messages
    if (messages.length === processedMessageCount) return;
    setProcessedMessageCount(messages.length);
    // Get last few agent messages for context
    const agentMessages = [...messages]
      .filter((msg) => msg.from && 'isLocal' in msg.from && !msg.from.isLocal)
      .slice(-3); // Last 3 agent messages

    if (agentMessages.length === 0) return;

    const lastMessage = agentMessages[agentMessages.length - 1];
    const text = lastMessage.message.toLowerCase();
    
    console.log('🛒 Cart Tracking - Processing message:', lastMessage.message);

    // Check if agent is confirming an item (before adding to cart)
    // "You want 1 Black Logo Hoodie in size L. That will be 1499 rupees"
    if (text.includes('you want') && text.includes('rupees')) {
      const item = extractPendingItem(lastMessage.message);
      if (item) {
        console.log('🛒 Pending item detected:', item);
        setPendingItem(item);
      }
    }

    // Check if item was added to cart
    if ((text.includes('added') || text.includes("i've added")) && text.includes('cart')) {
      console.log('🛒 Item added to cart detected');
      
      // First try to extract from current message
      let items = extractCartItems(lastMessage.message);
      
      // If not found, use pending item
      if (items.length === 0 && pendingItem) {
        console.log('🛒 Using pending item:', pendingItem);
        items = [pendingItem];
        setPendingItem(null);
      }
      
      // If still not found, look at previous messages
      if (items.length === 0 && agentMessages.length > 1) {
        const prevMessage = agentMessages[agentMessages.length - 2];
        items = extractCartItems(prevMessage.message);
      }
      
      console.log('🛒 Extracted items:', items);
      
      if (items.length > 0) {
        setCart((prevCart) => {
          const newCart = [...prevCart];
          
          items.forEach((item) => {
            const existingIndex = newCart.findIndex((i) => i.id === item.id);
            
            if (existingIndex >= 0) {
              // Update existing item
              newCart[existingIndex].quantity += item.quantity;
            } else {
              // Add new item
              newCart.push(item);
            }
          });
          
          console.log('🛒 Updated cart:', newCart);
          return newCart;
        });
      }
    }

    // Check if order was placed/confirmed
    if ((text.includes('order') && text.includes('created successfully')) || 
        (text.includes('order') && text.includes('confirmed'))) {
      // Extract order ID
      const orderIdMatch = lastMessage.message.match(/ORD-[\w-]+/);
      const orderId = orderIdMatch ? orderIdMatch[0] : `ORD-${Date.now()}`;

      // Extract total from message
      const totalMatch = lastMessage.message.match(/total[:\s]+(?:inr\s+|rupees\s+)?(\d+(?:\.\d+)?)/i);
      let total = totalMatch ? parseFloat(totalMatch[1]) : 0;

      // Use current cart if we have items
      setCart((currentCart) => {
        if (currentCart.length > 0) {
          // Calculate total if not found
          if (total === 0) {
            total = currentCart.reduce((sum, item) => sum + item.quantity * item.price, 0);
          }

          const order: LastOrder = {
            orderId,
            timestamp: new Date().toISOString(),
            items: [...currentCart],
            total,
          };

          console.log('🛒 Order created:', order);
          setLastOrder(order);
          setOrderPlaced(true);

          // Auto-hide order modal after 10 seconds
          setTimeout(() => setOrderPlaced(false), 10000);
          
          return []; // Clear cart after order
        }
        return currentCart;
      });
      
      // If cart was empty, try to extract from message
      if (false) {
        // Extract items from order confirmation if cart is empty
        const items = extractOrderItems(lastMessage.message);
        
        if (items.length > 0) {
          // Calculate total if not found
          if (total === 0) {
            total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
          }

          const order: LastOrder = {
            orderId,
            timestamp: new Date().toISOString(),
            items,
            total,
          };

          console.log('🛒 Order created:', order);
          setLastOrder(order);
          setOrderPlaced(true);

          // Auto-hide order modal after 10 seconds
          setTimeout(() => setOrderPlaced(false), 10000);
        }
      }
    }
  }, [messages.length, processedMessageCount]);

  return {
    cart,
    lastOrder,
    orderPlaced,
    setOrderPlaced,
    total: cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
  };
}

// Helper function to extract pending item from confirmation message
function extractPendingItem(message: string): CartItem | null {
  // "You want 1 Black Logo Hoodie in size L. That will be 1499 rupees"
  const pattern = /you\s+want\s+(\d+)\s+(.+?)\s+in\s+size\s+\w+.*?(\d+)\s+rupees/i;
  const match = message.match(pattern);
  
  if (match) {
    const quantity = parseInt(match[1]);
    const name = match[2].trim();
    const price = parseFloat(match[3]);
    
    return {
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name,
      quantity,
      price,
    };
  }
  
  return null;
}

// Helper function to extract cart items from "added to cart" messages
function extractCartItems(message: string): CartItem[] {
  const items: CartItem[] = [];
  
  // Look for patterns in the message
  // Pattern 1: "I've added [product] to your cart for [price] rupees"
  const pattern1 = /added\s+(.+?)\s+to\s+your\s+cart\s+for\s+(\d+)\s+rupees/i;
  const match1 = message.match(pattern1);
  
  if (match1) {
    const name = match1[1].trim();
    const price = parseFloat(match1[2]);
    
    items.push({
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name,
      quantity: 1,
      price,
    });
    return items;
  }
  
  // Pattern 2: Look back in conversation context for product details
  // "You want 1 Black Logo Hoodie in size L. That will be 1499 rupees"
  const pattern2 = /you\s+want\s+(\d+)\s+(.+?)\s+in\s+size\s+\w+.*?(\d+)\s+rupees/i;
  const match2 = message.match(pattern2);
  
  if (match2) {
    const quantity = parseInt(match2[1]);
    const name = match2[2].trim();
    const price = parseFloat(match2[3]);
    
    items.push({
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name,
      quantity,
      price,
    });
    return items;
  }
  
  return items;
}

// Helper function to extract order items from confirmation message
function extractOrderItems(message: string): CartItem[] {
  const items: CartItem[]= [];
  
  // Pattern: "1 x Black Logo Hoodie (size M): INR 1499"
  const itemPattern = /(\d+)\s+x\s+([^(]+?)(?:\s+\(size\s+\w+\))?:\s+(?:INR|₹)\s+(\d+(?:\.\d+)?)/gi;
  let match;
  
  while ((match = itemPattern.exec(message)) !== null) {
    const quantity = parseInt(match[1]);
    const name = match[2].trim();
    const lineTotal = parseFloat(match[3]);
    const price = lineTotal / quantity;
    
    items.push({
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name,
      quantity,
      price,
    });
  }
  
  return items;
}
