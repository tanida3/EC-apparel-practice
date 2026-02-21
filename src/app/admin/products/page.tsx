import { Suspense } from 'react';
import Link from 'next/link';
import { getAllProducts } from '@/lib/supabase/products';
import { ProductTable } from '@/components/admin/product-table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { TableSkeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '商品管理',
};

export default function AdminProductsPage() {
  return (
    <div>
      {/* ページヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">商品管理</h1>
          <p className="mt-1 text-sm text-[#6B7280]">商品の追加・編集・削除を行えます</p>
        </div>
        <Link href="/admin/products/new" className="shrink-0">
          <Button className="w-full sm:w-auto">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            商品を追加
          </Button>
        </Link>
      </div>

      {/* 商品テーブル */}
      <Suspense fallback={<TableSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}

async function ProductList() {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return (
        <EmptyState
          title="商品がまだありません"
          description="最初の商品を登録しましょう。"
          action={
            <Link href="/admin/products/new">
              <Button>商品を追加</Button>
            </Link>
          }
        />
      );
    }

    return <ProductTable products={products} />;
  } catch {
    return <ErrorState />;
  }
}
