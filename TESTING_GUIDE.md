# Day 9 Testing Guide

## Quick Start

```bash
# From Day9 directory
./start_app.sh
```

Then open http://localhost:3000

## Test Scenarios

### Scenario 1: Browse Mugs
**Say**: "Show me all coffee mugs"
**Expected**: Agent lists 3 mugs with prices
**Verify**: Products are numbered 1, 2, 3

### Scenario 2: Filter by Price
**Say**: "Show me mugs under 1000"
**Expected**: Agent lists 2 mugs (excludes ₹950 one is included, ₹650 and ₹800)
**Verify**: All prices are under ₹1000

### Scenario 3: Filter by Color
**Say**: "Do you have any black hoodies?"
**Expected**: Agent lists Black Logo Hoodie
**Verify**: Only black items shown

### Scenario 4: Place Order (No Size)
**Say**: "I'll buy the first mug"
**Expected**: Order created, confirmation with order ID and total
**Verify**: 
- Order ID format: order_YYYYMMDD_HHMMSS
- Total: ₹800
- Check cart drawer shows the order

### Scenario 5: Place Order (With Size)
**Say**: "I want to buy the black hoodie in size M"
**Expected**: Order created with size M
**Verify**:
- Size M is confirmed
- Total: ₹1499
- Cart drawer updates

### Scenario 6: Check Order History
**Say**: "What did I just buy?"
**Expected**: Agent reads back the last order details
**Verify**:
- Correct product name
- Correct quantity
- Correct total
- Timestamp shown

### Scenario 7: Multiple Filters
**Say**: "Show me black t-shirts"
**Expected**: Agent lists Black Graphic Tee
**Verify**: Only black t-shirts shown

### Scenario 8: Invalid Size
**Say**: "I'll buy the hoodie in size XXL"
**Expected**: Error message about size not available
**Verify**: Order not created

## UI Testing

### Cart Drawer
1. Click cart button (top-right)
2. Verify drawer slides in from right
3. Check "Last Order" section shows recent order
4. Verify order details are correct
5. Click X to close

### Catalog Panel
1. Click "Catalog & Tips" button (bottom-left)
2. Verify panel appears above button
3. Check categories are listed
4. Check example commands are shown
5. Click X to close

### Voice Interaction
1. Verify microphone button works
2. Check audio visualization
3. Verify transcript appears
4. Check agent responses are spoken

## Product Reference

### Mugs
- mug-001: Stoneware Coffee Mug (white, ₹800)
- mug-002: Blue Travel Mug (blue, ₹950)
- mug-003: Ceramic Espresso Cup (black, ₹650)

### Hoodies (Sizes: S, M, L, XL)
- hoodie-001: Black Logo Hoodie (black, ₹1499)
- hoodie-002: Grey Zip Hoodie (grey, ₹1799)

### T-Shirts (Sizes: S, M, L, XL)
- tshirt-001: White Classic T-Shirt (white, ₹699)
- tshirt-002: Navy Blue T-Shirt (blue, ₹749)
- tshirt-003: Black Graphic Tee (black, ₹799)

## Expected Behavior

### Agent Should:
- ✅ Always use tools to get product data
- ✅ Number products in responses (1, 2, 3...)
- ✅ Include prices in INR
- ✅ Confirm order details before creating
- ✅ Validate sizes for apparel
- ✅ Provide clear error messages

### Agent Should NOT:
- ❌ Invent products or prices
- ❌ Create orders without confirmation
- ❌ Accept invalid sizes
- ❌ Skip product validation

## Troubleshooting

### No products found
- Check merchant.py PRODUCTS list
- Verify filters are correct
- Try without filters first

### Order not created
- Check if size is required but not provided
- Verify product_id is correct
- Check backend logs for errors

### Cart not updating
- Currently shows last order only
- Refresh page if needed
- Check orders.json file in backend directory

### Voice not working
- Check microphone permissions
- Verify LiveKit server is running
- Check browser console for errors

## Backend Logs

Watch backend terminal for:
```
INFO:agent:Browsing products: category=mug, max_price=1000, color=None
INFO:agent:Creating order: product_id=mug-001, quantity=1, size=None
INFO:agent:Checking last order
```

## Files to Check

- **orders.json**: All created orders
- **Backend logs**: Function calls and errors
- **Browser console**: Frontend errors
- **Network tab**: WebSocket connection

## Success Criteria

✅ Can browse products by voice
✅ Can filter by category, price, color
✅ Can place orders with validation
✅ Can check order history
✅ Orders persist to file
✅ UI shows order details
✅ No errors in console
✅ Voice pipeline works smoothly
