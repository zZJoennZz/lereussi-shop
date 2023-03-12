export interface MetaType {
  title?: string;
  metaDescription?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  other?: string;
}

export interface OtherMeta {
  id: number;
  meta_tag_title?: string;
  meta_tag_description?: string;
  page_slug: string;
  product_type?: number;
  variant?: number;
}
