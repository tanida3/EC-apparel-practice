'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductGallery } from '@/components/product/product-gallery';
import { SizeSelector } from '@/components/product/size-selector';
import { ColorSelector } from '@/components/product/color-selector';
import { StockBadge } from '@/components/product/stock-badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const formattedPrice = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(product.price);

  const isOutOfStock = product.stock_status === 'out_of_stock';

  return (
    <>
      {/* パンくず */}
      <nav className="mb-6 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#1A1A1A] transition-colors">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1A1A]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* 画像ギャラリー */}
        <ProductGallery
          mainImage={product.image_url}
          subImages={product.sub_image_urls}
          productName={product.name}
        />

        {/* 商品情報 */}
        <div className="space-y-6">
          {/* ブランド・商品名 */}
          <div>
            <p className="text-sm text-[#6B7280] uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">{product.name}</h1>
          </div>

          {/* 価格 + 在庫 */}
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-[#1A1A1A]">{formattedPrice}</p>
            <StockBadge status={product.stock_status} />
          </div>

          {/* 区切り線 */}
          <hr className="border-[#E5E7EB]" />

          {/* カラー選択 */}
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
            disabled={isOutOfStock}
          />

          {/* サイズ選択 */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
            disabled={isOutOfStock}
          />

          {/* カートボタン（デモ） */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={isOutOfStock || (!selectedSize && product.sizes.length > 0)}
          >
            {isOutOfStock
              ? '在庫なし'
              : !selectedSize && product.sizes.length > 0
                ? 'サイズを選択してください'
                : 'カートに追加'}
          </Button>

          {/* 商品説明 */}
          {product.description && (
            <div>
              <h2 className="text-sm font-semibold text-[#1A1A1A] mb-2">商品説明</h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* カテゴリ情報 */}
          <div className="text-xs text-[#9CA3AF]">
            <p>カテゴリ: {product.category}</p>
          </div>
        </div>
      </div>
    </>
  );
}
