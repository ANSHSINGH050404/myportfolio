// components/ScrollToTop.tsx
// Client component for scroll-to-top button

"use client";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group flex items-center gap-2 text-gray-500 hover:text-gh-green transition-all duration-300 font-mono text-sm"
      aria-label="Scroll to top"
    >
      <span>Back to top</span>
      <svg
        className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
