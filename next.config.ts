import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=2678400, s-maxage=2678400, stale-while-revalidate=2678400",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ hostname: "pvmbbymkhkrvsbfybldi.supabase.co" }],
  },
  minimumCacheTTL: 2678400,
  qualities: [25, 50, 75],
};

export default nextConfig;
