'use client';

import { X } from '@phosphor-icons/react';

interface CatalogPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CatalogPanel({ isOpen, onClose }: CatalogPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="pointer-events-auto absolute left-4 bottom-16 w-[340px] rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-sm shadow-2xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-medium">Catalog & Voice Tips</h2>
        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-200"
          aria-label="Close catalog"
        >
          <X size={16} />
        </button>
      </div>

      {/* Mini catalog preview */}
      <section className="mb-3">
        <h3 className="text-xs font-semibold text-slate-300 mb-1">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-slate-800 px-2 py-1">
            ☕ Mugs (from ₹650)
          </span>
          <span className="rounded-full bg-slate-800 px-2 py-1">
            👕 T-Shirts (from ₹699)
          </span>
          <span className="rounded-full bg-slate-800 px-2 py-1">
            🧥 Hoodies (from ₹1399)
          </span>
          <span className="rounded-full bg-slate-800 px-2 py-1">
            🧢 Caps (from ₹499)
          </span>
          <span className="rounded-full bg-slate-800 px-2 py-1">
            🎒 Bags (from ₹899)
          </span>
        </div>
      </section>

      {/* Example voice queries */}
      <section>
        <h3 className="text-xs font-semibold text-slate-300 mb-1">
          Try saying:
        </h3>
        <ul className="list-disc pl-4 text-xs space-y-1 text-slate-300">
          <li>"Show me hoodies"</li>
          <li>"I want to see black caps"</li>
          <li>"Show me bags under 2000"</li>
          <li>"I'll buy the first hoodie in size M"</li>
          <li>"What did I just buy?"</li>
        </ul>
      </section>
    </div>
  );
}
