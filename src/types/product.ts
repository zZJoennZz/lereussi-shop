import { OtherMeta } from './meta';

export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  category: string;
  price: number;
  salePrice: number;
}

export interface ProductVariant {
  product_type: string;
  variant_id: string;
  variant_name: string;
  variant_description?: string;
  variant_image: string;
  sku: string;
  price: number;
  discount: number;
  media: ProductVariantMeta[];
  meta: OtherMeta;
  stocks: number;
}

export interface ProductVariantMeta {
  id: number;
  attachment: string;
  is_default: boolean;
  variant: number;
}
