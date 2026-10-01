import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ADR-0001: Node server (not static export). The /internal/admin and
  // /api/* routes require a Node runtime. Public site continues to
  // serve pre-rendered HTML at request time, but the same Next.js
  // process also handles the private routes on private.bettermachine.ai.
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
