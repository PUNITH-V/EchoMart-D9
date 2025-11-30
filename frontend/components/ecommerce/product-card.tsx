'use client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  color: string;
  image?: string;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
  onSelect?: (product: Product) => void;
}

export function ProductCard({ product, index, onSelect }: ProductCardProps) {
  return (
    <div
      className="flex flex-col bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
      onClick={() => onSelect?.(product)}
    >
      {product.image && (
        <div className="aspect-square bg-slate-700 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-xs px-2 py-1 rounded-full">
            #{index}
          </div>
        </div>
      )}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
        <p className="text-xs text-slate-400 mb-2 line-clamp-2">{product.description}</p>
        <div className="mt-auto">
          <p className="text-lg font-bold text-emerald-400">
            {product.currency} {product.price}
          </p>
          {product.sizes && (
            <p className="text-xs text-slate-500 mt-1">
              Sizes: {product.sizes.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProductGridProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
}

export function ProductGrid({ products, onSelectProduct }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <div className="my-4">
      <p className="text-sm text-slate-400 mb-3">
        Found {products.length} product{products.length !== 1 ? 's' : ''}:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {products.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            index={idx + 1}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
}
