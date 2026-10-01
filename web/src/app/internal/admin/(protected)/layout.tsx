import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-8 flex items-baseline justify-between gap-6 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#B87333] mb-3">Private · Admin</div>
            <h1 className="text-4xl font-light tracking-tight">Content Admin</h1>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/internal/admin" className="text-[#A0A0A0] hover:text-[#FAFAFA]">Dashboard</Link>
            <Link href="/internal/admin/projects" className="text-[#A0A0A0] hover:text-[#FAFAFA]">Projects</Link>
            <Link href="/internal/admin/agents" className="text-[#A0A0A0] hover:text-[#FAFAFA]">Agents</Link>
            <Link href="/internal/admin/audit" className="text-[#A0A0A0] hover:text-[#FAFAFA]">Audit Log</Link>
            <Link href="/pmo" className="text-[#B87333] hover:underline">PMO →</Link>
          </nav>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
