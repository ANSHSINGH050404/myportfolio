"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPostMeta } from "@/app/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative bg-charcoal-light/10 border border-charcoal-lighter/20 rounded-2xl p-8 hover:bg-charcoal-light/20 hover:border-gh-green/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gh-green/10">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-gh-green/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
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
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gh-green transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-400 mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <time dateTime={post.publishedAt}>
                {formattedDate}
              </time>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime} min read
              </span>
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-gh-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}