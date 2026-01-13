"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { name: "Start", href: "#" },
  { name: "Stats", href: "#stats" },
  { name: "Projects", href: "#projects" },
  { name: "Identity", href: "#philosophy" },
  { name: "Connect", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navWidth = useTransform(scrollY, [0, 100], ["100%", "auto"]);
  const navPadding = useTransform(scrollY, [0, 100], ["2rem", "0.5rem"]);

  return (
    <motion.nav
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] mt-6 w-max"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={`flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-500 ${
          isScrolled
            ? "bg-charcoal/80 border-charcoal-lighter/50 backdrop-blur-xl shadow-2xl shadow-black/50"
            : "bg-transparent border-transparent"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
          >
            <span className="relative z-10">{item.name}</span>
            <motion.div
              className="absolute inset-0 bg-gh-green/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              layoutId="nav-hover"
            />
          </Link>
        ))}
      </motion.div>
    </motion.nav>
  );
}
