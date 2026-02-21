import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct } from '@/lib/supabase/products';
import { ProductForm } from '@/components/admin/product-form';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product ? `${product.name} を編集` : '商品が見つかりません',
  };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      {/* パンくず */}
      <nav className="mb-6 text-sm text-[#6B7280]">
        <Link href="/admin/products" className="hover:text-[#1A1A1A] transition-colors">
          商品管理
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1A1A]">{product.name} を編集</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">商品を編集</h1>

      <ProductForm mode="edit" product={product} />
    </div>
  );
}
