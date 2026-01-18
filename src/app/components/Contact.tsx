// components/Contact.tsx
// Minimal contact section

"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 px-4 md:px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gh-green/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8">
            <span className="text-gray-400 text-[10px] md:text-xs font-mono tracking-widest uppercase">
              Available for collaborations
            </span>
          </div>

          <h2 className="text-5xl md:text-8xl font-bold text-white mb-6 md:mb-8 tracking-tighter">
            LET'S <span className="text-gh-green">SYNC</span>.
          </h2>

          <p className="text-gray-400 text-lg md:text-2xl mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            I'm always looking for ambitious projects where I can apply my
            architectural thinking.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 mb-16 md:mb-24 px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="mailto:anshsinghapa@gmail.com"
            className="w-full sm:w-auto group relative px-8 md:px-12 py-4 md:py-6 bg-gh-green text-black font-bold text-base md:text-lg rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(46,160,67,0.4)] flex justify-center"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Drop an Email
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.a>

          <motion.a
            href="https://github.com/anshsng"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto group px-8 md:px-12 py-4 md:py-6 border border-white/20 text-white font-bold text-base md:text-lg rounded-full hover:bg-white hover:text-black transition-all duration-500 text-center"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Digital Garden
          </motion.a>
        </motion.div>

        {/* Dynamic Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-16 md:pt-24 border-t border-white/5 text-left items-start">
          <div className="text-center md:text-left">
            <span className="block text-gh-green font-mono text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4">
              Location
            </span>
            <p className="text-gray-300 text-base md:text-lg">
              Remote / Worldwide
            </p>
          </div>
          <div className="text-center md:text-left">
            <span className="block text-gh-green font-mono text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4">
              Social Architecture
            </span>
            <div className="flex justify-center md:justify-start gap-6 text-sm md:text-base">
              <a
                href="https://x.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/anshsng"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <span className="block text-gh-green font-mono text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4">
              Local Time
            </span>
            <p className="text-gray-300 text-base md:text-lg font-mono uppercase">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
