import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-e370fcff-6d4a-4f7f-be28-4475180aef51.space-z.ai",
    "localhost",
  ],
};

export default nextConfig;
