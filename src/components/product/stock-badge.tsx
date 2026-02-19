import { Badge } from '@/components/ui/badge';
import { STOCK_STATUS_LABELS } from '@/lib/constants';
import type { StockStatus } from '@/types';

type StockBadgeProps = {
  status: StockStatus;
};

const variantMap: Record<StockStatus, 'success' | 'warning' | 'error'> = {
  in_stock: 'success',
  low_stock: 'warning',
  out_of_stock: 'error',
};

export function StockBadge({ status }: StockBadgeProps) {
  return (
    <Badge variant={variantMap[status]}>
      {STOCK_STATUS_LABELS[status]}
    </Badge>
  );
}
