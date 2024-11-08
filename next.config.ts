import withAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

type Protocol = 'http' | 'https';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: getRemotePatterns(),
  },
};

function getRemotePatterns() {
  // add here the remote patterns for your images
  const remotePatterns = [];

  const supabaseURL = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
  const protocol = supabaseURL.protocol.replace(':', '') as Protocol;
  const hostname = supabaseURL.hostname;
  remotePatterns.push({
    protocol,
    hostname,
  });

  remotePatterns.push({
    protocol: 'https' as const,
    hostname: 'loremflickr.com',
  });

  return remotePatterns;
}

export default withAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
