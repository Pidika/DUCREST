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
};

export default nextConfig;
