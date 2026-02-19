'use client';

import { usePathname } from 'next/navigation';
import { SITE_NAME } from '@/lib/constants';

export function Footer() {
  const pathname = usePathname();

  // 管理画面ではフッターを表示しない
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold tracking-wider text-[#1A1A1A] mb-4">{SITE_NAME}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              このサイトはポートフォリオ用のデモアプリケーションです。
              実際のECサイトではありません。
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">技術スタック</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>Next.js (App Router)</li>
              <li>React / TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Supabase</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">リンク</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1A1A1A] transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
          <p className="text-xs text-[#9CA3AF] text-center">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Portfolio Demo.
          </p>
        </div>
      </div>
    </footer>
  );
}
