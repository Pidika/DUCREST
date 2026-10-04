import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === '1';
const isNamecheap = process.env.DEPLOY_TARGET === 'namecheap';
const basePath = isVercel ? '' : process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: isNamecheap ? 'standalone' : isVercel ? undefined : 'export',
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  compress: true,
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        {key: 'Strict-Transport-Security', value: 'max-age=31536000'},
        {key: 'X-Content-Type-Options', value: 'nosniff'},
        {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
        {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
      ],
    }];
  },
};

export default nextConfig;
