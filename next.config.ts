import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
