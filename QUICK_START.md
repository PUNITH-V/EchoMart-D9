# Day 9 - Quick Start Guide

## What You're Building

A voice-driven e-commerce shopping assistant where users can:
- Browse products by voice
- Place orders by voice  
- Check order history by voice

## 30-Second Setup

```bash
cd Day9
./start_app.sh
```

Open http://localhost:3000 and start talking!

## Try These Commands

1. **"Show me all coffee mugs"**
   - Agent lists 3 mugs with prices

2. **"Do you have any black hoodies?"**
   - Agent shows black hoodies with sizes

3. **"I'll buy the first hoodie in size M"**
   - Agent creates order and confirms

4. **"What did I just buy?"**
   - Agent reads your last order

## UI Features

- **Cart Button** (top-right): View order history
- **Catalog & Tips** (bottom-left): See products and example commands

## What's Under the Hood

### Backend
- **merchant.py**: Product catalog + order management
- **agent.py**: Voice AI with 3 tools (browse, order, check)
- **STT**: AssemblyAI
- **LLM**: Google Gemini
- **TTS**: Murf Falcon

### Frontend
- **cart-drawer.tsx**: Order history panel
- **catalog-panel.tsx**: Product tips panel
- **ecommerce-session-view.tsx**: Main wrapper (doesn't modify LiveKit UI)

## Product Catalog

- **3 Mugs**: ₹650 - ₹950
- **2 Hoodies**: ₹1499 - ₹1799 (with sizes)
- **3 T-Shirts**: ₹699 - ₹799 (with sizes)

## Architecture

```
Voice Input → AssemblyAI → Gemini → Merchant Functions → Murf → Voice Output
                              ↓
                         orders.json
```

## Files Changed

**Backend:**
- ✅ Created `src/merchant.py` (product catalog + orders)
- ✅ Modified `src/agent.py` (added 3 function tools)

**Frontend:**
- ✅ Created `components/ecommerce/cart-drawer.tsx`
- ✅ Created `components/ecommerce/catalog-panel.tsx`
- ✅ Created `components/ecommerce/ecommerce-session-view.tsx`
- ✅ Modified `components/app/view-controller.tsx`

## Key Design Principles

1. **No LiveKit Modifications**: Existing UI components untouched
2. **Voice-First**: UI supplements, doesn't replace voice
3. **Tool-Based**: LLM calls Python functions (not hardcoded)
4. **Clean Separation**: Commerce logic separate from conversation

## Troubleshooting

**No voice?** Check microphone permissions
**No products?** Backend might not be running
**Orders not saving?** Check `orders.json` in backend directory

## Next Steps

1. Test all voice commands
2. Check cart drawer after placing orders
3. View catalog panel for tips
4. Check `orders.json` for persisted orders

## Documentation

- **DAY9_GUIDE.md**: Complete feature documentation
- **TESTING_GUIDE.md**: Detailed test scenarios
- **IMPLEMENTATION_SUMMARY.md**: Technical details

---

**Ready to shop with your voice!** 🛒🎙️
