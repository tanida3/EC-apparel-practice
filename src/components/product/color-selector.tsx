'use client';

import type { ProductColor } from '@/types';

type ColorSelectorProps = {
  colors: ProductColor[];
  selectedColor: string | null;
  onSelect: (colorName: string) => void;
  disabled?: boolean;
};

export function ColorSelector({ colors, selectedColor, onSelect, disabled }: ColorSelectorProps) {
  if (colors.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-[#1A1A1A] mb-3">
        カラー
        {selectedColor && (
          <span className="ml-2 font-normal text-[#6B7280]">{selectedColor}</span>
        )}
      </h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color.name;
          const isWhite = color.hex.toUpperCase() === '#FFFFFF' || color.hex.toUpperCase() === '#FFF';

          return (
            <button
              key={color.name}
              onClick={() => onSelect(color.name)}
              disabled={disabled}
              className={`
                relative w-9 h-9 rounded-full transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isSelected ? 'ring-2 ring-[#1A1A1A] ring-offset-2' : 'hover:ring-2 hover:ring-[#9CA3AF] hover:ring-offset-1'}
                ${isWhite ? 'border border-[#D1D5DB]' : ''}
              `}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
              aria-pressed={isSelected}
              title={color.name}
            />
          );
        })}
      </div>
    </div>
  );
}
