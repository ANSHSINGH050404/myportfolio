import { supabase } from "./supabase";
import { BlogPost, BlogPostMeta } from "./blog";

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, published_at, tags, read_time, cover_image",
    )
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.published_at,
    tags: post.tags,
    readTime: post.read_time,
    coverImage: post.cover_image,
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    tags: data.tags,
    readTime: data.read_time,
    coverImage: data.cover_image,
  };
}

export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase.from("posts").select("tags");

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  const tags = new Set<string>();
  data.forEach((post) => {
    post.tags?.forEach((tag: string) => tags.add(tag));
  });

  return Array.from(tags).sort();
}
