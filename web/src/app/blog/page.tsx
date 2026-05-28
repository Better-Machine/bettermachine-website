import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPosts, formatDate, GhostPost } from "@/lib/ghost";

export const metadata: Metadata = {
  title: "Studio Blog | Better Machine",
  description: "Thoughts on building, AI, and the ventures we are working on.",
};

// Transform Ghost post to BlogCard format
function transformPost(post: GhostPost) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    category: post.tags?.[0]?.name || "Studio",
    publishedAt: post.published_at,
    authorName: post.primary_author?.name || "Better Machine",
    imageUrl: post.feature_image,
  };
}

export default async function BlogPage() {
  const posts = await getPosts(20);
  const transformedPosts = posts.map(transformPost);

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
            {transformedPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transformedPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-slate-500 text-lg">
                  Blog posts coming soon. Each venture will have its own voice here.
                </p>
                <p className="text-slate-600 text-sm mt-2">
                  (Ghost CMS integration ready — waiting for content)
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
