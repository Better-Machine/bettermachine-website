import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  category?: string;
  publishedAt?: string;
  authorName?: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  imageUrl,
  category,
  publishedAt,
  authorName,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block relative p-6 bg-gradient-to-br from-white/[0.02] to-transparent
                 border border-white/5 hover:border-[#B87333]/30
                 rounded-xl transition-all duration-500
                 hover:shadow-[0_8px_40px_rgba(184,115,51,0.1)]"
    >
      {/* Featured image */}
      {imageUrl && (
        <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>
      )}

      {/* Category */}
      {category && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium
                       bg-[#B87333]/10 text-[#B87333] rounded-full">
          {category}
        </span>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-3
                   group-hover:text-[#B87333] transition-colors duration-300">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-slate-500">
        {publishedAt && (
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        )}
        {authorName && (
          <span>by {authorName}</span>
        )}
      </div>

      {/* Read more */}
      <div className="mt-4 flex items-center gap-2 text-[#B87333]/70 group-hover:text-[#B87333] transition-colors">
        <span className="text-sm font-medium">Read more</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </Link>
  );
}
