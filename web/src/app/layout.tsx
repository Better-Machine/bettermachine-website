import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Better Machine — Native Startup Lab",
  description: "A native startup lab applying leading-edge AI to deliver creative business solutions with passion, idealism, and capitalism.",
  keywords: ["AI", "startup lab", "agentic AI", "business solutions", "automation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-void text-offwhite antialiased">
        {children}
      </body>
    </html>
  );
}
