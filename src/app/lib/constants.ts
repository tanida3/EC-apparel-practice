export const CATEGORIES =[
    'すべて', 'トップス', 'パンツ', 'アウター',
    'ワンピース', 'シューズ', 'バッグ', 'アクセサリー',
] as const;

export const SIZES  = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL',
] as const;

export const STOCK_STATUS_LABELS: Record<string, string> = {
    in_stock: '在庫あり',
    low_stock: '残りわずか',
    out_of_stock: '在庫なし',
};

export const PRESET_COLORS = [
    { name: 'ブラック', hex: '#1A1A1A' },
    { name: 'ホワイト', hex: '#FFFFFF' },
    { name: 'ネイビー', hex: '#1E3A5F' },
    { name: 'グレー', hex: '#9CA3AF' },
    { name: 'ベージュ', hex: '#D4C5A9' },
    { name: 'ブラウン', hex: '#8B6914' },
    { name: 'レッド', hex: '#DC2626' },
    { name: 'ブルー', hex: '#2563EB' },
    { name: 'グリーン', hex: '#059669' },
    { name: 'ピンク', hex: '#EC4899' },
] as const;

export const SITE_NAME = 'AND STYLE';
export const SITE_DESCRIPTION = 'あなたのスタイルを、ここから。';