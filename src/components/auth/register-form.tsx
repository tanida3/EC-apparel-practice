'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (formData.password.length < 6) {
      newErrors.password = 'パスワードは6文字以上で入力してください';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワード（確認）を入力してください';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setServerError('このメールアドレスは既に登録されています');
        } else {
          setServerError('登録に失敗しました。再度お試しください。');
        }
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } catch {
      setServerError('登録に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {serverError && (
        <div className="p-3 rounded bg-[#FEF2F2] border border-[#FECACA] text-sm text-[#DC2626]">
          {serverError}
        </div>
      )}

      <Input
        label="メールアドレス"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        autoComplete="email"
        disabled={isLoading}
      />

      <Input
        label="パスワード"
        type="password"
        placeholder="6文字以上"
        value={formData.password}
        onChange={handleChange('password')}
        error={errors.password}
        autoComplete="new-password"
        disabled={isLoading}
      />

      <Input
        label="パスワード（確認）"
        type="password"
        placeholder="もう一度入力"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        error={errors.confirmPassword}
        autoComplete="new-password"
        disabled={isLoading}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        アカウントを作成
      </Button>

      <p className="text-sm text-center text-[#6B7280]">
        既にアカウントをお持ちの方は{' '}
        <Link href="/auth/login" className="text-[#1A1A1A] font-medium hover:underline">
          ログイン
        </Link>
      </p>
    </form>
  );
}
