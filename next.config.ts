import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "pvmbbymkhkrvsbfybldi.supabase.co" }],
  },
  cache: "no-store",
};

export default nextConfig;
