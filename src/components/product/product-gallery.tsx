'use client';

import { useState } from 'react';
import Image from 'next/image';

type ProductGalleryProps = {
  mainImage: string;
  subImages: string[];
  productName: string;
};

export function ProductGallery({ mainImage, subImages, productName }: ProductGalleryProps) {
  const allImages = [mainImage, ...subImages];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* メイン画像 */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#F5F5F5]">
        <Image
          src={allImages[selectedIndex]}
          alt={`${productName} - 画像${selectedIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* サムネイルリスト */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                relative w-20 h-20 shrink-0 rounded overflow-hidden
                transition-all duration-200
                ${
                  selectedIndex === index
                    ? 'ring-2 ring-[#1A1A1A] ring-offset-1'
                    : 'opacity-60 hover:opacity-100'
                }
              `}
              aria-label={`画像${index + 1}を表示`}
            >
              <Image
                src={image}
                alt={`${productName} - サムネイル${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
