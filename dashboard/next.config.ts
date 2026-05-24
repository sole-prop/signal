import type { NextConfig } from "next";

const BACKEND = process.env.BACKEND_URL ?? "http://localhost:8001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/health", destination: `${BACKEND}/health` },
      { source: "/api/:path*", destination: `${BACKEND}/api/:path*` },
      { source: "/stream", destination: `${BACKEND}/stream` },
    ];
  },
};

export default nextConfig;
