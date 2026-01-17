export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  readTime: number;
  coverImage?: string;
}

export interface BlogPostMeta {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  coverImage?: string;
}