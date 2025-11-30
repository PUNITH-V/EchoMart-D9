'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export function CartDrawer({ isOpen, onClose, items }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Premium Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-2xl border-l border-white/10"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <div className="flex h-full flex-col">
              {/* Premium Header */}
              <div className="relative border-b border-white/10 px-6 py-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Your Cart</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      {items.length} {items.length === 1 ? 'item' : 'items'} in cart
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-white/10 hover:text-white border border-white/10"
                  >
                    <X size={24} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                        <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 11H19L20 21H4L5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
                    <p className="text-slate-400 text-sm max-w-xs">
                      Start shopping by using voice commands to add items to your cart
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className="group rounded-2xl bg-white/5 backdrop-blur-sm p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          {/* Item Number Badge */}
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-amber-400 font-bold text-sm">{index + 1}</span>
                          </div>
                          
                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">{item.name}</h3>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400">Qty:</span>
                                <span className="px-2 py-1 rounded-lg bg-white/10 text-white font-medium">{item.quantity}</span>
                              </div>
                              <div className="text-slate-400">
                                ₹{item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              ₹{(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Premium Footer with Summary */}
              {items.length > 0 && (
                <div className="border-t border-white/10 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
                  <div className="px-6 py-6 space-y-4">
                    {/* Pricing Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Subtotal</span>
                        <span className="text-white font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Shipping</span>
                        <span className="text-emerald-400 font-medium">FREE</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Tax (estimated)</span>
                        <span className="text-white font-medium">₹{(subtotal * 0.18).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10" />

                    {/* Grand Total */}
                    <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Grand Total</span>
                        <span className="text-2xl font-bold text-amber-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          ₹{(subtotal * 1.18).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                    >
                      Continue Shopping
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
