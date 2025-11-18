import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'ac.goit.global' },
      { protocol: 'https', hostname: 'ftp.goit.study' },
      { protocol: 'https', hostname: 'example.com' },
      { protocol: 'https', hostname: 'travellers-front.vercel.app' }
    ]
	}
};

export default nextConfig;
