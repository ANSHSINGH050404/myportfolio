import { getAllPosts, getAllTags } from "@/app/lib/blog-data";
import BlogCard from "@/app/components/BlogCard";
import AnimatedContainer from "@/app/components/AnimatedContainer";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

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
        {/* Header */}
        <AnimatedContainer className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Thoughts, tutorials, and insights on web development, software
              engineering, and technology.
            </p>
            <Link
              href="/blog/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gh-green/10 text-gh-green rounded-full border border-gh-green/20 hover:bg-gh-green hover:text-black transition-all duration-300 font-mono text-sm"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Post
            </Link>
          </div>
        </AnimatedContainer>

        {/* Tags */}
        <AnimatedContainer delay={0.2} duration={0.6} className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="text-sm text-gray-500 font-mono">
                Filter by:
              </span>
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 text-sm font-mono bg-charcoal-light/10 text-gray-400 rounded-full border border-charcoal-lighter/20 hover:bg-gh-green/10 hover:text-gh-green hover:border-gh-green/30 transition-all duration-300"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </AnimatedContainer>

        {/* Posts Grid */}
        <AnimatedContainer delay={0.4} duration={0.6} className="px-6 pb-32">
          <div className="max-w-4xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                {posts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400">No blog posts found.</p>
              </div>
            )}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
