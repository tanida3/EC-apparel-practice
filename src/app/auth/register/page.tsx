import { RegisterForm } from '@/components/auth/register-form';
import { SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新規登録',
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-wider">{SITE_NAME}</h1>
          <p className="mt-2 text-sm text-[#6B7280]">アカウントを作成</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
