// app/layout.tsx
// Root layout with metadata and providers

import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import CustomCursor from "@/app/components/CustomCursor";
// import SmoothScroll from "@/app/components/SmoothScroll";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ANSH SINGH — Full-Stack Engineer",
  description:
    "Portfolio of a full-stack engineer who builds scalable, thoughtful software. Showcasing GitHub projects, contributions, and engineering philosophy.",
  keywords: [
    "developer",
    "engineer",
    "full-stack",
    "software",
    "GitHub",
    "open-source",
  ],
  authors: [{ name: "ANSH SINGH" }],
  openGraph: {
    title: "ANSH SINGH — Full-Stack Engineer",
    description: "I build scalable, thoughtful software.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANSH SINGH — Full-Stack Engineer",
    description: "I build scalable, thoughtful software.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrains.variable} ${syne.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-charcoal text-white font-mono antialiased"
      >
        {/* <SmoothScroll /> */}
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
