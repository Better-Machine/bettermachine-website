import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 2026-09-30: dropped `output: "export"`. PMO and API routes need a
  // Node.js runtime. See DEPLOY.md for the production setup.
  // `output: "export"` made the prior marketing-only site work, but it
  // breaks /api/* and dynamic pages. The deploy now rsyncs source and
  // runs `next start` behind a reverse proxy.
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
