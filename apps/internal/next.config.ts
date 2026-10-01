import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Internal app: Node server, served from bettermachine-host
  // (private.bettermachine.ai). API routes require runtime, so static
  // export is not an option here.
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
