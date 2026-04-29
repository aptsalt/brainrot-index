import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingEmojis } from "@/components/floating-emojis";
import { Nav } from "@/components/nav";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrainRot Index | How Cooked Is Your Thinking?",
  description:
    "Drop your tweets, shower thoughts, 3 AM notes, or unhinged ideas. AI scores how cooked your thinking is across 6 dimensions. Powered by Gemini.",
  openGraph: {
    title: "BrainRot Index",
    description:
      "AI scores how cooked your thinking is. Drop your thoughts and find out.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainRot Index",
    description: "AI scores how cooked your thinking is.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col scanlines" style={{ background: "var(--background)" }}>
        <FloatingEmojis />
        <ThemeToggle />
        <Nav />
        <div className="relative z-10 flex-1">{children}</div>
      </body>
    </html>
  );
}
