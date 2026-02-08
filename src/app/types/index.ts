export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export type ProductColor = {
    name: string;
    hex: string;
};

export type Product = {
    id: string;
    name: string;
    brand: string;
    description: string | null;
    price: number;
    category: string;
    image_url: string;
    sub_image_urls: string[];
    sizes: string[];
    colors: ProductColor[];
    stock_status: StockStatus;
    is_published: boolean;
    created_at: string;
    updated_at: string;
};

export type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type UIState = 'idle' | 'loading' | 'error' | 'success';