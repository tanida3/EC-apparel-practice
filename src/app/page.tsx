import { Suspense } from 'react';
import { getProducts } from '@/lib/supabase/products';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { CategoryFilter } from '@/components/product/category-filter';
import { SITE_DESCRIPTION } from '@/lib/constants';

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { category } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* ヒーローセクション */}
      <section className="mb-10 md:mb-14">
        <h1 className="text-2xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">
          {SITE_DESCRIPTION}
        </h1>
        <p className="mt-2 text-sm md:text-base text-[#6B7280]">
          厳選されたアイテムで、あなたらしいスタイルを見つけてください。
        </p>
      </section>

      {/* カテゴリフィルター */}
      <CategoryFilter currentCategory={category} />

      {/* 商品グリッド */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductList category={category} />
      </Suspense>
    </div>
  );
}

async function ProductList({ category }: { category?: string }) {
  try {
    const products = await getProducts(category);
    return <ProductGrid products={products} />;
  } catch {
    return <ErrorState />;
  }
}
