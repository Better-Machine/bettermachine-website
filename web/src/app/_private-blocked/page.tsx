// Stub 404 page used by middleware.ts when a private route is hit on a
// public hostname. Renders a real 404 to avoid leaking route shape.
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-md">
          <p className="font-mono text-sm text-copper tracking-[0.2em] uppercase">404</p>
          <h1 className="text-4xl font-medium text-snow mt-6">Page Not Found</h1>
          <p className="text-silver mt-4">
            The page you're looking for doesn't exist on this site.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
