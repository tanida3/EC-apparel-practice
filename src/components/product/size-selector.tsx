'use client';

type SizeSelectorProps = {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
  disabled?: boolean;
};

export function SizeSelector({ sizes, selectedSize, onSelect, disabled }: SizeSelectorProps) {
  if (sizes.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-[#1A1A1A] mb-3">サイズ</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              disabled={disabled}
              className={`
                px-4 py-2 text-sm rounded border transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#D1D5DB] hover:border-[#1A1A1A]'
                }
              `}
              aria-pressed={isSelected}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
