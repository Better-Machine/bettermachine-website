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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bettermachine.ai";

export const metadata: Metadata = {
  title: {
    default: "Better Machine — Native Startup Lab",
    template: "%s | Better Machine",
  },
  description: "A native startup lab applying leading-edge AI to deliver creative business solutions with passion, idealism, and capitalism.",
  keywords: ["AI", "startup lab", "agentic AI", "business solutions", "automation", "Ray", "Liz", "Erik Ross"],
  authors: [{ name: "Erik Ross" }],
  creator: "Better Machine",
  publisher: "Better Machine",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Better Machine",
    title: "Better Machine — Native Startup Lab",
    description: "A native startup lab applying leading-edge AI to deliver creative business solutions with passion, idealism, and capitalism.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Better Machine — Native Startup Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@erikdross",
    creator: "@erikdross",
    title: "Better Machine — Native Startup Lab",
    description: "A native startup lab applying leading-edge AI to deliver creative business solutions with passion, idealism, and capitalism.",
    images: ["/og-image.png"],
  },
  verification: {
    // Placeholder — fill in when domain is verified
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className={`${inter.className} ${mono.variable} min-h-screen bg-[#0A0A0A] text-[#FAFAFA] antialiased`}>
        {children}
      </body>
    </html>
  );
}
