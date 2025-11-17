import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
            {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      { protocol: 'https', hostname: 'ac.goit.global' },
      { protocol: 'https', hostname: 'ftp.goit.study' }
    ]
	}
};

export default nextConfig;
