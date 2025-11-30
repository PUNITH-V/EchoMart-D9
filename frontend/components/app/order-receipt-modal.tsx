'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Download, CheckCircle } from '@phosphor-icons/react';
import type { CartItem } from './cart-drawer';

export interface LastOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  total: number;
}

interface OrderReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: LastOrder | null;
}

export function OrderReceiptModal({ isOpen, onClose, order }: OrderReceiptModalProps) {
  const handleDownloadJSON = () => {
    if (!order) return;

    const dataStr = JSON.stringify(order, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${order.orderId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!order) return null;

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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal - Premium Two-Column Layout */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-2xl border border-white/10 overflow-hidden"
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 rounded-xl p-2.5 text-slate-400 transition-all hover:bg-white/10 hover:text-white backdrop-blur-sm border border-white/10"
              >
                <X size={24} weight="bold" />
              </button>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0 max-h-[85vh]">
                {/* Left Column - Order Details */}
                <div className="p-8 overflow-y-auto">
                  {/* Success Icon & Status */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-4 border border-emerald-500/30">
                      <CheckCircle size={40} weight="fill" className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                          ✓ CONFIRMED
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Order Confirmed
                      </h2>
                    </div>
                  </div>

                  {/* Order Information Card */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
                    <h3 className="text-sm font-semibold text-amber-400 mb-4 uppercase tracking-wide">Order Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="text-slate-400 text-sm">Order Number</span>
                        <span className="font-mono text-white font-semibold">#{order.orderId}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="text-slate-400 text-sm">Order Date</span>
                        <span className="text-white">{new Date(order.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Order Time</span>
                        <span className="text-white">{new Date(order.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information Card */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
                    <h3 className="text-sm font-semibold text-amber-400 mb-4 uppercase tracking-wide">Customer Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-slate-400 text-xs uppercase tracking-wide">Name</span>
                        <p className="text-white font-medium mt-1">Customer Name</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs uppercase tracking-wide">Delivery Address</span>
                        <p className="text-white font-medium mt-1">Address will be collected</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Status */}
                  <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" className="text-amber-400"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Processing Order</h4>
                        <p className="text-amber-300 text-sm">Your order is being prepared</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Receipt Summary */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 border-l border-white/10 overflow-y-auto">
                  <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Order Summary</h3>

                  {/* Items List */}
                  <div className="space-y-3 mb-6">
                    {order.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm mb-1">{item.name}</h4>
                          <p className="text-slate-400 text-xs">Qty: {item.quantity} × ₹{item.price.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">₹{(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 my-6" />

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="text-white">₹{order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Shipping</span>
                      <span className="text-emerald-400 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Tax (18%)</span>
                      <span className="text-white">₹{(order.total * 0.18).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Grand Total</span>
                      <span className="text-3xl font-bold text-amber-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        ₹{(order.total * 1.18).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleDownloadJSON}
                      className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm px-6 py-4 font-semibold text-white transition-all hover:bg-white/20 border border-white/10"
                    >
                      <Download size={20} weight="bold" />
                      Download Receipt
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/30"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
