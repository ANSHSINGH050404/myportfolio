// app/page.tsx
// Main portfolio page with smooth transitions and cohesive design

import Hero from "@/app/components/Hero";
import GitHubStats from "@/app/components/GitHubStats";
import Projects from "@/app/components/Projects";
import Philosophy from "@/app/components/Philosophy";
import Contact from "@/app/components/Contact";
import SmoothScroll from "@/app/components/SmoothScroll";
import PageTransition from "@/app/components/PageTransition";
import ScrollToTop from "@/app/components/ScrollToTop";
import {
  getGitHubRepos,
  getGitHubStats,
  getMockContributions,
} from "@/app/lib/github";
import ScrollProgress from "@/app/components/ScrollProgress";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch GitHub data server-side
  let repos: any = [];
  let stats = {
    totalCommits: 1200,
    totalStars: 0,
    activeRepos: 0,
    contributionYears: 3,
    topLanguages: {},
  };

  try {
    repos = await getGitHubRepos(6);
    stats = await getGitHubStats();
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    // Use fallback data
    repos = [];
    stats = {
      totalCommits: 1200,
      totalStars: 45,
      activeRepos: 12,
      contributionYears: 3,
      topLanguages: {
        TypeScript: 15,
        JavaScript: 12,
        Python: 8,
        Go: 5,
        Rust: 3,
      },
    };
  }

  // Generate contribution data for visualization
  const contributionData = getMockContributions(365);

  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <PageTransition>
        <main className="relative bg-[#050505] overflow-hidden">
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

            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Section dividers with smooth transitions */}
          <div className="relative z-10">
            {/* Hero Section */}
            <div className="relative">
              <Hero contributionData={contributionData} />

              {/* Smooth transition gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(23, 23, 23, 0.5), #171717)",
                }}
              />
            </div>

            {/* Stats Section with entrance reveal */}
            <div id="stats" className="relative">
              <GitHubStats stats={stats} topLanguages={stats.topLanguages} />

              {/* Divider line with glow */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-gh-green/30 to-transparent" />
              </div>
            </div>

            {/* Projects Section */}
            <div id="projects" className="relative">
              <Projects repos={repos} />

              {/* Transition gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(5, 5, 5, 0.8))",
                }}
              />
            </div>

            {/* Philosophy Section with subtle background shift */}
            <div
              id="philosophy"
              className="relative bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]"
            >
              <Philosophy />
            </div>

            {/* Contact Section - Final call to action */}
            <div id="contact" className="relative">
              <Contact />

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #0a0a0a)",
                }}
              />
            </div>

            {/* Footer */}
            <footer className="relative bg-[#0a0a0a] border-t border-charcoal-lighter/20 py-12 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Copyright */}
                  <div className="text-gray-500 text-sm font-mono">
                    © {new Date().getFullYear()} Built with Next.js & Framer
                    Motion
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-6">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gh-green transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>

                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gh-green transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>

                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gh-green transition-all duration-300 hover:scale-110"
                      aria-label="Twitter"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>

                  {/* Scroll to top */}
                  <ScrollToTop />
                </div>
              </div>
            </footer>
          </div>
        </main>
      </PageTransition>
    </>
  );
}
