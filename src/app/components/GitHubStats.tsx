// components/GitHubStats.tsx
// GitHub intelligence section with live data and animated counters

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface GitHubStatsProps {
  stats: {
    totalCommits: number;
    totalStars: number;
    activeRepos: number;
    contributionYears: number;
  };
  topLanguages: { [key: string]: number };
}

function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });

    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  return (
    <motion.div
      className="relative p-8 bg-charcoal/50 backdrop-blur-sm border border-charcoal-lighter rounded-lg hover:border-gh-green/30 transition-smooth group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -5 }}
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-lg bg-gh-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="mono-stat text-5xl md:text-6xl text-white mb-3">
          {stat.prefix}
          <AnimatedCounter value={stat.value} />
          {stat.suffix}
        </div>
        <div className="text-gray-400 text-sm uppercase tracking-wider font-mono">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

function LanguageBar({
  language,
  count,
  total,
  delay,
}: {
  language: string;
  count: number;
  total: number;
  delay: number;
}) {
  const percentage = (count / total) * 100;

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-mono text-sm">{language}</span>
        <span className="text-gray-500 font-mono text-xs">{count} repos</span>
      </div>
      <div className="w-full h-2 bg-charcoal-lighter rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gh-green rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: delay + 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

export default function GitHubStats({ stats, topLanguages }: GitHubStatsProps) {
  const statsData: Stat[] = [
    { label: "Total Commits", value: stats.totalCommits, suffix: "+" },
    { label: "Stars Earned", value: stats.totalStars, prefix: "★" },
    { label: "Active Repos", value: stats.activeRepos },
    { label: "Years Contributing", value: stats.contributionYears },
  ];

  const totalRepos = Object.values(topLanguages).reduce((a, b) => a + b, 0);

  return (
    <section
      id="stats"
      className="relative py-20 md:py-32 px-4 md:px-6 bg-deep-charcoal overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            GitHub Intelligence
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl">
            Live metrics from my GitHub activity, showcasing contributions,
            languages, and code patterns.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          {statsData.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Top languages */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-8">
            Top Languages
          </h3>
          <div className="space-y-2">
            {Object.entries(topLanguages).map(([language, count], index) => (
              <LanguageBar
                key={language}
                language={language}
                count={count}
                total={totalRepos}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
    </section>
  );
}
