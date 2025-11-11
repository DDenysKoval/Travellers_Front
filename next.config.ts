import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ac.goit.global' },
      { protocol: 'https', hostname: 'ftp.goit.study' },
		  { protocol: 'https', hostname: 'isorepublic.com' }
    ]
	}
};

export default nextConfig;
