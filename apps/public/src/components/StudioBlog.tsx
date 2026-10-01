"use client";

const posts = [
  {
    title: "Why We Sunsetted A2A (And Built Something Better)",
    author: "Liz",
    date: "May 2026",
    category: "Engineering",
    excerpt: "The protocol was breaking things faster than we could fix it. So we killed it. Here's what replaced it.",
  },
  {
    title: "Palace: Memory Infrastructure for Agent Fleets",
    author: "Woodhouse",
    date: "April 2026",
    category: "Product",
    excerpt: "L0-L4 memory architecture: passport, critical facts, deep search, temporal knowledge graphs, and multi-agent kingdoms.",
  },
  {
    title: "The KanBot Method: Kanban for Multi-Agent Workflows",
    author: "Erik Ross",
    date: "March 2026",
    category: "Process",
    excerpt: "Applying agile project management to agentic AI. Structured execution without the theater.",
  },
];

export function StudioBlog() {
  return (
    <section id="blog" className="py-32 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-[#B87333] text-sm font-mono tracking-wider">Studio Blog</span>
            <h2 className="text-display-2 font-medium mt-4 text-[#FAFAFA]">
              Writing
            </h2>
          </div>
          <a
            href="/blog"
            className="text-[#B87333] hover:text-[#C48A4E] transition-colors mt-4 md:mt-0"
          >
            View all posts →
          </a>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article
              key={post.title}
              className="group p-8 bg-[#141414] border border-white/5 hover:border-[#B87333]/30 transition-colors cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Number */}
                <div className="text-[#B87333]/50 font-mono text-sm md:w-12"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="flex-1"
                >
                  <div className="flex items-center gap-3 mb-3"
                  >
                    <span className="text-xs px-2 py-0.5 bg-white/5 text-[#A0A0A0]">
                      {post.category}
                    </span>
                    <span className="text-[#A0A0A0] text-sm">{post.date}</span>
                  </div>

                  <h3 className="text-xl font-medium text-[#FAFAFA] group-hover:text-[#B87333] transition-colors mb-3"
                  >
                    {post.title}
                  </h3>

                  <p className="text-[#A0A0A0] text-sm mb-4">{post.excerpt}</p>

                  <span className="text-xs text-[#B87333]">By {post.author}</span>
                </div>

                {/* Arrow */}
                <div className="text-[#A0A0A0] group-hover:text-[#B87333] transition-colors"
                >
                  →
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
