import Link from 'next/link';
import { Button } from './components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#E5E7EB] mb-4">404</h1>
      <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">ページが見つかりません</h2>
      <p className="text-sm text-[#6B7280] mb-8">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link href="/">
        <Button variant="outline">トップに戻る</Button>
      </Link>
    </div>
  );
}
