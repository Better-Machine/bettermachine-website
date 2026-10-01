import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Public site: static export, served from Hostinger
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
