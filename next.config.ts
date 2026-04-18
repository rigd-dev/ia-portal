import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/quiz',
        destination: '/recursos/fluidez-en-ia',
        permanent: true,
      },
      {
        source: '/guia',
        destination: '/recursos/fluidez-en-ia/guia',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
