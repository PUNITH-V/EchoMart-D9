'use client';

import { X, Check, ShoppingBag } from '@phosphor-icons/react';

interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  size?: string;
  price: number;
  line_total: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  currency: string;
  created_at: string;
  status?: 'pending' | 'completed';
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lastOrder: Order | null;
}

export function CartDrawer({ isOpen, onClose, lastOrder }: CartDrawerProps) {
  const isCompleted = lastOrder?.status === 'completed';

  return (
    <aside
      className={`h-full w-[380px] border-l border-slate-800 bg-slate-900/95 backdrop-blur-md transition-transform duration-200 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-emerald-400" />
            <h2 className="text-sm font-semibold">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {lastOrder ? (
            <div className="space-y-4">
              {/* Order Status */}
              {isCompleted && (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="bg-emerald-500/20 rounded-full p-1">
                    <Check size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-400">Purchase complete</p>
                    <p className="text-xs text-slate-400">Order confirmed</p>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="space-y-3">
                {lastOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <div className="w-16 h-16 bg-slate-700 rounded-md flex items-center justify-center">
                      <ShoppingBag size={24} className="text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{item.product_name}</h3>
                      {item.size && (
                        <p className="text-xs text-slate-400">{item.size}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-sm font-semibold text-emerald-400 mt-1">
                        {lastOrder.currency} {item.line_total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-slate-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-semibold">{lastOrder.currency} {lastOrder.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span className="font-semibold">{lastOrder.currency} 0</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-slate-700 pt-2">
                  <span>Total</span>
                  <span className="text-emerald-400">{lastOrder.currency} {lastOrder.total}</span>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-slate-800/30 rounded-lg p-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order ID</span>
                  <span className="font-mono text-slate-300">{lastOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date</span>
                  <span className="text-slate-300">
                    {new Date(lastOrder.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time</span>
                  <span className="text-slate-300">
                    {new Date(lastOrder.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Confirmation Message */}
              {isCompleted && (
                <div className="text-xs text-slate-400 bg-slate-800/30 rounded-lg p-3">
                  🎉 Order confirmed! You'll receive a confirmation email soon.
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="bg-slate-800/50 rounded-full p-6 mb-4">
                <ShoppingBag size={48} className="text-slate-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
              <p className="text-sm text-slate-400 mb-4">
                Start shopping by asking the voice assistant about our products!
              </p>
              <div className="text-xs text-slate-500 space-y-1">
                <p>Try saying:</p>
                <p className="text-slate-400">"Show me hoodies"</p>
                <p className="text-slate-400">"I want a black cap"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
