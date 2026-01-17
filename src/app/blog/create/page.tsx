"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import AnimatedContainer from "@/app/components/AnimatedContainer";

export default function CreatePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    read_time: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      published_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("posts").insert([postData]);

    if (error) {
      alert("Error creating post: " + error.message);
      setLoading(false);
    } else {
      router.push("/blog");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
      <AnimatedContainer className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Create New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Title
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => {
                const newTitle = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  title: newTitle,
                  slug:
                    prev.slug === "" ||
                    prev.slug === prev.title.toLowerCase().replace(/ /g, "-")
                      ? newTitle
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "")
                      : prev.slug,
                }));
              }}
              className="w-full bg-charcoal-light/10 border border-charcoal-lighter/20 rounded-lg px-4 py-3 text-white focus:border-gh-green/50 focus:outline-none transition-colors"
              placeholder="Post Title"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Slug (URL path, max 100 chars)
            </label>
            <input
              required
              type="text"
              maxLength={100}
              value={formData.slug}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  slug: e.target.value.toLowerCase().replace(/ /g, "-"),
                })
              }
              className="w-full bg-charcoal-light/10 border border-charcoal-lighter/20 rounded-lg px-4 py-3 text-white focus:border-gh-green/50 focus:outline-none transition-colors"
              placeholder="my-cool-post"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Excerpt
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full bg-charcoal-light/10 border border-charcoal-lighter/20 rounded-lg px-4 py-3 text-white focus:border-gh-green/50 focus:outline-none transition-colors h-24"
              placeholder="Short summary of the post..."
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Content (Markdown)
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full bg-charcoal-light/10 border border-charcoal-lighter/20 rounded-lg px-4 py-3 text-white font-mono focus:border-gh-green/50 focus:outline-none transition-colors h-64"
              placeholder="# Your Content Here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full bg-charcoal-light/10 border border-charcoal-lighter/20 rounded-lg px-4 py-3 text-white focus:border-gh-green/50 focus:outline-none transition-colors"
                placeholder="Nextjs, React, Web"
              />
            </div>
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">
                Read Time (mins)
              </label>
              <input
                type="number"
                value={formData.read_time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    read_time: parseInt(e.target.value),
                  })
                }
                className="w-full bg-charcoal-light/10 border border-charcoal-lighter/20 rounded-lg px-4 py-3 text-white focus:border-gh-green/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gh-green text-black font-bold rounded-lg hover:bg-white transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </AnimatedContainer>
    </div>
  );
}
