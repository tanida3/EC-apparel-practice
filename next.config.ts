  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',  // ← この外部ドメインの画像を許可
        },
      ],
    },
  };

  export default nextConfig;