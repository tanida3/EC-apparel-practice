import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/login-form';
import { SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-wider">{SITE_NAME}</h1>
          <p className="mt-2 text-sm text-[#6B7280]">管理画面にログイン</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB]">
          <Suspense fallback={<div className="h-64 animate-pulse bg-[#F5F5F5] rounded" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
