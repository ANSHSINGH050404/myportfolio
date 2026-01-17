import { getPostBySlug, getAllPosts } from "@/app/lib/blog-data";
import { notFound } from "next/navigation";
import AnimatedContainer from "@/app/components/AnimatedContainer";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.slug && post.slug.length < 100)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Convert markdown-style content to HTML (basic implementation)
  const content = post.content
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-2xl font-semibold text-white mt-8 mb-4">$1</h3>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-3xl font-semibold text-white mt-8 mb-4">$1</h2>',
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-4xl font-bold text-white mt-8 mb-4">$1</h1>',
    )
    .replace(
      /\*\*(.*)\*\*/g,
      '<strong class="text-white font-semibold">$1</strong>',
    )
    .replace(/\*(.*)\*/g, '<em class="text-gray-300 italic">$1</em>')
    .replace(
      /```(tsx?|js|ts)?\n([\s\S]*?)```/g,
      '<pre class="bg-charcoal-light/20 border border-charcoal-lighter/20 rounded-lg p-4 overflow-x-auto my-6"><code class="text-sm text-gray-300 font-mono">$2</code></pre>',
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-charcoal-light/20 text-gh-green px-2 py-1 rounded text-sm font-mono">$1</code>',
    )
    .replace(/^\- (.*$)/gim, '<li class="text-gray-300 ml-6">$1</li>')
    .replace(
      /(<li.*<\/li>)/s,
      '<ul class="list-disc list-inside my-4 space-y-2">$1</ul>',
    )
    .replace(/\n\n/g, '</p><p class="text-gray-300 mb-4 leading-relaxed">')
    .replace(/^(.*)$/, '<p class="text-gray-300 mb-4 leading-relaxed">$1</p>')
    .replace(/<p class="text-gray-300 mb-4 leading-relaxed"><h/g, "<h")
    .replace(/<\/h([1-6])><\/p>/g, "</h$1>")
    .replace(/<p class="text-gray-300 mb-4 leading-relaxed"><pre/g, "<pre")
    .replace(/<\/pre><\/p>/g, "</pre>")
    .replace(/<p class="text-gray-300 mb-4 leading-relaxed"><ul/g, "<ul")
    .replace(/<\/ul><\/p>/g, "</ul>");

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(46, 160, 67, 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 animate-float-slower"
          style={{
            background:
              "radial-gradient(circle, rgba(46, 160, 67, 0.3) 0%, transparent 70%)",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(46, 160, 67, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(46, 160, 67, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Back to Blog */}
        <AnimatedContainer className="pt-32 pb-8 px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gh-green transition-colors duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </AnimatedContainer>

        {/* Article Header */}
        <AnimatedContainer as="article" delay={0.2} className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono bg-gh-green/10 text-gh-green rounded-full border border-gh-green/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.readTime} min read
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-charcoal-lighter/50 to-transparent mb-12" />
          </div>
        </AnimatedContainer>

        {/* Article Content */}
        <AnimatedContainer delay={0.4} className="px-6 pb-32">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </AnimatedContainer>

        {/* Back to Blog (Bottom) */}
        <AnimatedContainer delay={0.6} className="px-6 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gh-green/10 text-gh-green rounded-full border border-gh-green/20 hover:bg-gh-green/20 transition-all duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to All Posts
            </Link>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
