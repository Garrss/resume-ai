import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    // Alternatively use remotePatterns for more control:
    // remotePatterns: [
    //   { protocol: "https", hostname: "images.unsplash.com" },
    // ],
  },
  serverExternalPackages: ["pdf-parse", "@napi-rs/canvas"],
};

export default nextConfig;
// ...existing code...