// components/Projects.tsx
// Featured projects from GitHub with smooth, sophisticated interactions

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GitHubRepo } from "@/app/lib/github";
import { useState } from "react";

interface ProjectsProps {
  repos: GitHubRepo[];
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tracking for card tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="perspective-1000 h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <motion.a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card container with glass morphism */}
        <div className="relative h-full p-8 bg-gradient-to-br from-charcoal-lighter/20 to-charcoal-lighter/5 backdrop-blur-xl border border-charcoal-lighter/30 rounded-3xl overflow-hidden transition-all duration-500 ease-out group-hover:border-gh-green/30 group-hover:shadow-2xl group-hover:shadow-gh-green/5">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gh-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content container */}
          <div
            className="relative z-10 h-full flex flex-col justify-between"
            style={{ transform: "translateZ(30px)" }}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gh-green/10 flex items-center justify-center border border-gh-green/20 group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-5 h-5 text-gh-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>

                <motion.div
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  whileHover={{ rotate: 45, scale: 1.1 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gh-green transition-colors duration-300 line-clamp-1">
                {repo.name}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                {repo.description ||
                  "No description provided for this architectural masterpiece."}
              </p>
            </div>

            <div>
              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-6">
                {repo.topics?.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-[10px] font-mono bg-white/5 text-gray-400 rounded-md border border-white/10 group-hover:border-gh-green/30 group-hover:text-gh-green/70 transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gh-green" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {repo.stargazers_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Projects({ repos }: ProjectsProps) {
  return (
    <section className="relative py-32 px-6 bg-charcoal overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(46, 160, 67, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(46, 160, 67, 0.5) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(46, 160, 67, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with reveal animation */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 rounded-full bg-gh-green/10 border border-gh-green/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-gh-green text-sm font-mono font-medium tracking-wide">
              OPEN SOURCE
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Featured Projects
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Open-source work and personal projects, sorted by impact and
            community engagement.
          </motion.p>
        </motion.div>

        {/* Projects grid with bento-style layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {repos.map((repo, index) => {
            const isLarge = index === 0 || index === 5;
            const isWide = index === 2 || index === 3;

            return (
              <div
                key={repo.id}
                className={`${
                  isLarge
                    ? "lg:col-span-2 lg:row-span-2"
                    : isWide
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                <ProjectCard repo={repo} index={index} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-lighter/50 backdrop-blur-sm border border-charcoal-lighter rounded-full text-gray-300 font-medium hover:border-gh-green hover:text-gh-green hover:bg-gh-green/5 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View all projects on GitHub</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
