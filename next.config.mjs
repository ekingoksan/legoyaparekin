import path from 'path';

// __dirname için alternatif çözüm
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 1,
      static: 1,
    },
  },
  webpack(config) {
    // `@` alias'ını proje köküne yönlendirme
    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;