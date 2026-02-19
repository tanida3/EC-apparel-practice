'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SITE_NAME } from '@/lib/constants';
import type { User } from '@supabase/supabase-js';

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // 管理画面ではヘッダーを表示しない
  if (pathname.startsWith('/admin')) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="text-xl font-bold tracking-wider text-[#1A1A1A]">
            {SITE_NAME}
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition-colors hover:text-[#1A1A1A] ${
                pathname === '/' ? 'text-[#1A1A1A] font-medium' : 'text-[#6B7280]'
              }`}
            >
              商品一覧
            </Link>
            {user ? (
              <>
                <Link
                  href="/admin/products"
                  className={`text-sm transition-colors hover:text-[#1A1A1A] ${
                    pathname.startsWith('/admin') ? 'text-[#1A1A1A] font-medium' : 'text-[#6B7280]'
                  }`}
                >
                  管理画面
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm px-4 py-2 bg-[#1A1A1A] text-white rounded hover:bg-[#333] transition-colors"
              >
                ログイン
              </Link>
            )}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="メニュー"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* モバイルメニュー */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-[#E5E7EB] pt-4 space-y-3 animate-slide-up">
            <Link
              href="/"
              className="block text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              商品一覧
            </Link>
            {user ? (
              <>
                <Link
                  href="/admin/products"
                  className="block text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  管理画面
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ログイン
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
