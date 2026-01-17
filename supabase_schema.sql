-- SQL for creating the blog posts table in Supabase

create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  published_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  tags text[] default array[]::text[],
  read_time integer not null default 5,
  cover_image text,
  author_id uuid references auth.users(id)
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Create policy to allow public read access
create policy "Public can read posts"
on posts for select
using (true);

-- Create policy to allow authenticated users to manage their own posts (optional)
create policy "Authenticated users can manage posts"
on posts for all
using (auth.uid() = author_id);

-- Sample Data
insert into posts (title, slug, excerpt, content, tags, read_time)
values 
(
  'Building Modern Web Applications with Next.js', 
  'building-modern-web-applications-nextjs', 
  'Explore the power of Next.js 14 and how it revolutionizes web development.', 
  '# Building Modern Web Applications with Next.js\n\nNext.js has evolved significantly...', 
  array['Next.js', 'React', 'Web Development'], 
  5
),
(
  'The Art of Clean Code', 
  'art-of-clean-code-principles', 
  'Discover fundamental principles of writing maintainable and elegant code.', 
  '# The Art of Clean Code\n\nClean code is not just about making your code work...', 
  array['Clean Code', 'Software Engineering', 'Best Practices'], 
  7
);
