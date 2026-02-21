import { createClient } from './server';
import { DUMMY_PRODUCTS } from '@/lib/dummy-data';
import type { Product, ProductFormData } from '@/types';

const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined;

export async function getProducts(category?: string): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    const products = DUMMY_PRODUCTS.filter((p) => p.is_published);
    if (category && category !== 'すべて') {
      return products.filter((p) => p.category === category);
    }
    return products;
  }

  const supabase = await createClient();
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (category && category !== 'すべて') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as Product[];
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return DUMMY_PRODUCTS;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Product[];
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return DUMMY_PRODUCTS.find((p) => p.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Product;
}

export async function createProduct(product: ProductFormData): Promise<Product> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabaseが設定されていません。.env.localを確認してください。');
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Product;
}

export async function updateProduct(id: string, product: Partial<ProductFormData>): Promise<Product> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabaseが設定されていません。.env.localを確認してください。');
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .update({ ...product, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabaseが設定されていません。.env.localを確認してください。');
  }

  const supabase = await createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
