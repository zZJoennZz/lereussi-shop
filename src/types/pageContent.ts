export interface Page {
  internalName?: string;
  pageTitle: string;
  pageSlug: string;
  pageContent?: string;
  isHome: boolean;
  metaDescription?: string;
  metaRobots?: string;
  metaKeywords?: string;
  otherMetaData?: string;
  isPublished: boolean;
}
