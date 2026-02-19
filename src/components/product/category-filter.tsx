'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';

type CategoryFilterProps = {
  currentCategory?: string;
};

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'すべて') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/?${params.toString()}`);
  };

  const activeCategory = currentCategory || 'すべて';

  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`
              px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors duration-200
              ${
                activeCategory === category
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-[#F5F5F5] text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#1A1A1A]'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
