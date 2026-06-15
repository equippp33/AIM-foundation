/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produces a self-contained server bundle for Docker / Coolify deployment.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config) => {
    // Windows + Next.js dev noise: Next resolves some of its own internal client
    // modules with an uppercase drive letter (C:\) and others with lowercase (c:\),
    // so webpack reports "multiple modules ... differ in casing". It is benign — the
    // mismatch is inside Next internals (not our code) and production builds are clean.
    // Silence only this specific warning so genuine warnings stay visible.
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { message: /multiple modules with names that only differ in casing/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
