import { OtherMeta } from './meta';

export interface Category {
  product_type: string;
  product_type_image: string;
  product_type_description?: string;
  meta: OtherMeta;
}
