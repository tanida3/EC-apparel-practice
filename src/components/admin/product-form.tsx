'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ToastContainer } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { CATEGORIES, SIZES, PRESET_COLORS } from '@/lib/constants';
import type { Product, ProductColor } from '@/types';

type ProductFormProps = {
  mode: 'create' | 'edit';
  product?: Product;
};

type FormData = {
  name: string;
  brand: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  sub_image_urls: string;
  sizes: string[];
  colors: ProductColor[];
  stock_status: string;
  is_published: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const categoryOptions = CATEGORIES.filter((c) => c !== 'すべて').map((c) => ({ value: c, label: c }));

const stockOptions = [
  { value: 'in_stock', label: '在庫あり' },
  { value: 'low_stock', label: '残りわずか' },
  { value: 'out_of_stock', label: '在庫なし' },
];

function productToFormData(product: Product): FormData {
  return {
    name: product.name,
    brand: product.brand,
    description: product.description || '',
    price: String(product.price),
    category: product.category,
    image_url: product.image_url,
    sub_image_urls: product.sub_image_urls.join('\n'),
    sizes: product.sizes,
    colors: product.colors,
    stock_status: product.stock_status,
    is_published: product.is_published,
  };
}

const initialFormData: FormData = {
  name: '',
  brand: '',
  description: '',
  price: '',
  category: '',
  image_url: '',
  sub_image_urls: '',
  sizes: [],
  colors: [],
  stock_status: 'in_stock',
  is_published: true,
};

export function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  const [formData, setFormData] = useState<FormData>(
    product ? productToFormData(product) : initialFormData
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = '商品名を入力してください';
    if (!formData.brand.trim()) newErrors.brand = 'ブランド名を入力してください';
    if (!formData.price) {
      newErrors.price = '価格を入力してください';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = '正しい価格を入力してください';
    }
    if (!formData.category) newErrors.category = 'カテゴリを選択してください';
    if (!formData.image_url.trim()) {
      newErrors.image_url = 'メイン画像URLを入力してください';
    }
    if (!formData.stock_status) newErrors.stock_status = '在庫状態を選択してください';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const payload = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        description: formData.description.trim() || null,
        price: Number(formData.price),
        category: formData.category,
        image_url: formData.image_url.trim(),
        sub_image_urls: formData.sub_image_urls
          .split('\n')
          .map((url) => url.trim())
          .filter(Boolean),
        sizes: formData.sizes,
        colors: formData.colors,
        stock_status: formData.stock_status,
        is_published: formData.is_published,
      };

      if (mode === 'create') {
        const { error } = await supabase.from('products').insert(payload);
        if (error) throw error;
        addToast('商品を登録しました', 'success');
        setTimeout(() => router.push('/admin/products'), 1000);
      } else if (product) {
        const { error } = await supabase
          .from('products')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', product.id);
        if (error) throw error;
        addToast('商品を更新しました', 'success');
        setTimeout(() => router.push('/admin/products'), 1000);
      }

      router.refresh();
    } catch {
      addToast(
        mode === 'create' ? '商品の登録に失敗しました' : '商品の更新に失敗しました',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color: ProductColor) => {
    setFormData((prev) => {
      const exists = prev.colors.some((c) => c.name === color.name);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter((c) => c.name !== color.name)
          : [...prev.colors, color],
      };
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl" noValidate>
        {/* 基本情報 */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">基本情報</h2>
          <div className="space-y-4">
            <Input
              label="商品名"
              placeholder="オーバーサイズ クルーネック Tシャツ"
              value={formData.name}
              onChange={handleChange('name')}
              error={errors.name}
              disabled={isSubmitting}
            />
            <Input
              label="ブランド名"
              placeholder="URBAN LAYERS"
              value={formData.brand}
              onChange={handleChange('brand')}
              error={errors.brand}
              disabled={isSubmitting}
            />
            <Textarea
              label="商品説明"
              placeholder="商品の特徴や素材について記載してください"
              value={formData.description}
              onChange={handleChange('description')}
              disabled={isSubmitting}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="価格（円）"
                type="number"
                placeholder="4900"
                value={formData.price}
                onChange={handleChange('price')}
                error={errors.price}
                disabled={isSubmitting}
              />
              <Select
                label="カテゴリ"
                options={categoryOptions}
                value={formData.category}
                onChange={handleChange('category')}
                placeholder="選択してください"
                error={errors.category}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </section>

        {/* 画像 */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">画像</h2>
          <div className="space-y-4">
            <Input
              label="メイン画像URL"
              placeholder="https://images.unsplash.com/..."
              value={formData.image_url}
              onChange={handleChange('image_url')}
              error={errors.image_url}
              disabled={isSubmitting}
            />
            <Textarea
              label="サブ画像URL（1行に1URL）"
              placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
              value={formData.sub_image_urls}
              onChange={handleChange('sub_image_urls')}
              disabled={isSubmitting}
            />
          </div>
        </section>

        {/* サイズ */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">サイズ</h2>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => {
              const isSelected = formData.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  disabled={isSubmitting}
                  className={`
                    px-4 py-2 text-sm rounded border transition-all duration-200
                    disabled:opacity-50
                    ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#6B7280] border-[#D1D5DB] hover:border-[#1A1A1A]'
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </section>

        {/* カラー */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">カラー</h2>
          <div className="flex flex-wrap gap-3">
            {PRESET_COLORS.map((color) => {
              const isSelected = formData.colors.some((c) => c.name === color.name);
              const isWhite = color.hex === '#FFFFFF';
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => toggleColor({ name: color.name, hex: color.hex })}
                  disabled={isSubmitting}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 text-sm rounded border transition-all duration-200
                    disabled:opacity-50
                    ${
                      isSelected
                        ? 'border-[#1A1A1A] bg-[#F5F5F5]'
                        : 'border-[#D1D5DB] hover:border-[#9CA3AF]'
                    }
                  `}
                >
                  <span
                    className={`w-4 h-4 rounded-full shrink-0 ${isWhite ? 'border border-[#D1D5DB]' : ''}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* ステータス */}
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">ステータス</h2>
          <div className="space-y-4">
            <Select
              label="在庫状態"
              options={stockOptions}
              value={formData.stock_status}
              onChange={handleChange('stock_status')}
              error={errors.stock_status}
              disabled={isSubmitting}
            />
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                disabled={isSubmitting}
                className="w-4 h-4 rounded border-[#D1D5DB] text-[#1A1A1A] focus:ring-[#1A1A1A]"
              />
              <span className="text-sm text-[#1A1A1A]">公開する</span>
            </label>
          </div>
        </section>

        {/* 送信ボタン */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#E5E7EB]">
          <Button type="submit" isLoading={isSubmitting}>
            {mode === 'create' ? '商品を登録' : '変更を保存'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/products')}
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
        </div>
      </form>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
