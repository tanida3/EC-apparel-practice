import Link from 'next/link';
import Image from 'next/image';
import { StockBadge } from './stock-badge';
import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(product.price);

  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* 商品画像 */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#F5F5F5]">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock_status !== 'in_stock' && (
          <div className="absolute top-2 left-2">
            <StockBadge status={product.stock_status} />
          </div>
        )}
      </div>

      {/* 商品情報 */}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-[#6B7280] uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-sm text-[#1A1A1A] line-clamp-2 group-hover:underline decoration-[#1A1A1A]/30 underline-offset-2">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-[#1A1A1A]">{formattedPrice}</p>
      </div>
    </Link>
  );
}
