// components/Philosophy.tsx
// Engineering philosophy and principles

"use client";

import { motion } from "framer-motion";

const principles = [
  {
    title: "Clarity over cleverness",
    description:
      "Code should be obvious to the next person who reads it. Smart solutions are good; clear solutions are better.",
  },
  {
    title: "Systems > features",
    description:
      "Build platforms that enable possibilities, not just solutions to today's problems.",
  },
  {
    title: "Performance is a feature",
    description:
      "Speed and efficiency aren't nice-to-haves. They're core to user experience.",
  },
  {
    title: "Write for humans first",
    description:
      "Code is read far more than it's written. Optimize for comprehension and maintenance.",
  },
];

function PrincipleCard({
  principle,
  index,
}: {
  principle: (typeof principles)[0];
  index: number;
}) {
  return (
    <motion.div
      className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-gh-green/[0.02] hover:border-gh-green/20 transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-white/[0.02] group-hover:text-gh-green/[0.05] transition-colors font-mono">
        0{index + 1}
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gh-green transition-colors">
          {principle.title}
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
          {principle.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gh-green group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-[#050505]"
    >
      {/* Background Text Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[20vw] font-black text-white/[0.01] pointer-events-none select-none whitespace-nowrap uppercase hidden sm:block">
        Philosophy
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-gh-green/10 border border-gh-green/20 mb-6">
              <span className="text-gh-green text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase">
                Ethos & Guiding Principles
              </span>
            </div>

            <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tight">
              Crafting <span className="text-gh-green">Digital</span> Integrity.
            </h2>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 max-w-xl">
              Engineering is not just about writing code; it's about making
              choices that balance speed, reliability, and human understanding.
            </p>

            <div className="p-6 md:p-8 border-l-4 border-gh-green bg-gh-green/5 rounded-r-2xl">
              <blockquote className="text-xl md:text-2xl text-gray-200 font-light italic">
                "Make it work, make it right, make it fast—in that order."
              </blockquote>
              <cite className="block mt-4 text-gh-green font-mono text-sm not-italic">
                — Kent Beck
              </cite>
            </div>
          </motion.div>

          {/* Right: Principle Grid */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 mt-12 lg:mt-0">
            {principles.map((principle, index) => (
              <PrincipleCard
                key={principle.title}
                principle={principle}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
