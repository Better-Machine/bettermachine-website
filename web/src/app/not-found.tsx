import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          <div className="text-8xl font-bold text-[#B87333]/30 mb-6">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-silver mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-[#B87333] text-void font-semibold rounded-lg hover:bg-[#D4945A] transition-colors"
            >
              Back Home
            </Link>
            <Link
              href="/ventures"
              className="px-6 py-3 border border-[#B87333] text-[#B87333] font-semibold rounded-lg hover:bg-[#B87333]/10 transition-colors"
            >
              View Ventures
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
