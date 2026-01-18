// components/Hero.tsx
// Hero section with Three.js background and scroll hint

"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load Three.js component
const CommitFlowField = dynamic(() => import("./CommitFlowField"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-deep-charcoal via-charcoal to-charcoal-light" />
  ),
});

interface HeroProps {
  contributionData: number[];
}

export default function Hero({ contributionData }: HeroProps) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-deep-charcoal via-charcoal to-charcoal-light" />
          }
        >
          <CommitFlowField contributionData={contributionData} />
        </Suspense>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-charcoal/40 to-deep-charcoal z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="overflow-hidden mb-4">
            <motion.p
              className="text-gh-green font-mono text-xs md:text-sm tracking-[0.3em] uppercase"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Engineering the future
            </motion.p>
          </div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              ANSH <span className="text-white/30 md:text-white/20">SINGH</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg md:text-2xl lg:text-3xl text-gray-400 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
              Creating <span className="text-white font-medium">scalable</span>{" "}
              digital architectures with a focus on{" "}
              <span className="text-white font-medium">performance</span> and{" "}
              <span className="text-white font-medium">user intent</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <motion.a
                href="#projects"
                className="btn-primary w-full sm:w-auto group relative overflow-hidden text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Explore Projects</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-secondary w-full sm:w-auto text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm text-gray-500 font-mono uppercase tracking-wider">
            Scroll
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gh-green"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
