'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { StockBadge } from '@/components/product/stock-badge';
import { ToastContainer } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/types';

type ProductTableProps = {
  products: Product[];
};

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deleteTarget.id);

      if (error) throw error;

      addToast('商品を削除しました', 'success');
      setDeleteTarget(null);
      router.refresh();
    } catch {
      addToast('削除に失敗しました', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
        {/* デスクトップテーブルヘッダー */}
        <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_120px_100px] gap-4 px-6 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs font-medium text-[#6B7280] uppercase tracking-wider">
          <span>画像</span>
          <span>商品名</span>
          <span>価格</span>
          <span>在庫</span>
          <span>公開</span>
          <span>操作</span>
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {products.map((product) => (
            <div key={product.id}>
              {/* デスクトップ行 */}
              <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_120px_100px] gap-4 px-6 py-4 items-center hover:bg-[#F9FAFB] transition-colors">
                <div className="relative w-16 h-16 rounded overflow-hidden bg-[#F5F5F5] shrink-0">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider">{product.brand}</p>
                  <p className="text-sm font-medium text-[#1A1A1A] truncate">{product.name}</p>
                </div>
                <p className="text-sm font-medium text-[#1A1A1A]">{formatPrice(product.price)}</p>
                <div>
                  <StockBadge status={product.stock_status} />
                </div>
                <div>
                  <Badge variant={product.is_published ? 'success' : 'default'}>
                    {product.is_published ? '公開中' : '非公開'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Button variant="ghost" size="sm">編集</Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteTarget(product)}
                    className="text-[#DC2626] hover:bg-[#FEF2F2]"
                  >
                    削除
                  </Button>
                </div>
              </div>

              {/* モバイルカード */}
              <div className="md:hidden px-4 py-4 hover:bg-[#F9FAFB] transition-colors">
                <div className="flex gap-3">
                  <div className="relative w-16 h-16 rounded overflow-hidden bg-[#F5F5F5] shrink-0">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider">{product.brand}</p>
                    <p className="text-sm font-medium text-[#1A1A1A] truncate">{product.name}</p>
                    <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5">{formatPrice(product.price)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <StockBadge status={product.stock_status} />
                    <Badge variant={product.is_published ? 'success' : 'default'}>
                      {product.is_published ? '公開中' : '非公開'}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant="ghost" size="sm">編集</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTarget(product)}
                      className="text-[#DC2626] hover:bg-[#FEF2F2]"
                    >
                      削除
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 削除確認モーダル */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="商品の削除"
      >
        <p className="text-sm text-[#6B7280] mb-6">
          <span className="font-semibold text-[#1A1A1A]">{deleteTarget?.name}</span>{' '}
          を削除しますか？この操作は取り消せません。
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)} disabled={isDeleting}>
            キャンセル
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete} isLoading={isDeleting}>
            削除する
          </Button>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
