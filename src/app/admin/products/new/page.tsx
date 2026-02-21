import Link from 'next/link';
import { ProductForm } from '@/components/admin/product-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '商品を追加',
};

export default function NewProductPage() {
  return (
    <div>
      {/* パンくず */}
      <nav className="mb-6 text-sm text-[#6B7280]">
        <Link href="/admin/products" className="hover:text-[#1A1A1A] transition-colors">
          商品管理
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1A1A]">新規登録</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">商品を追加</h1>

      <ProductForm mode="create" />
    </div>
  );
}
