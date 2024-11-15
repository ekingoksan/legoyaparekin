/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
          dynamic: 1,
          static: 1,
        },
      },
};

export default nextConfig;
