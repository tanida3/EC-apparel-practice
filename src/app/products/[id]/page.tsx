import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/supabase/products';
import { ProductDetailClient } from './product-detail-client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: '商品が見つかりません' };

  return {
    title: `${product.name} - ${product.brand}`,
    description: product.description || `${product.brand}の${product.name}`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <ProductDetailClient product={product} />
    </div>
  );
}
