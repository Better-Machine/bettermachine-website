import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Studio Blog | Better Machine",
  description: "Thoughts on building, AI, and the ventures we are working on.",
};

// Static blog data (will come from DB in production)
const blogPosts = [
  {
    slug: "hello-world",
    title: "Hello World — The Machine Is Learning",
    excerpt: "Better Machine is a native AI lab turning lived experience into ventures that matter. We do not chase trends. We build what should exist.",
    category: "Studio",
    publishedAt: "2026-05-20",
    authorName: "Erik Ross",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-24 px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-sm text-[#B87333] tracking-[0.2em] uppercase">
              Studio Blog
            </span>
            <div className="mt-4 w-12 h-px bg-[#B87333]/40" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-6">
              Thoughts on Building
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mt-6">
              Updates from the lab — what we are learning, what we are building, and the questions we are wrestling with.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-slate-500 text-lg">
                  Blog posts coming soon. Each venture will have its own voice here.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
