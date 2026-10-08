/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Shared kit ships as TS source; Next compiles it with the site.
  transpilePackages: ['@www/shared'],
  // Emit a static `out/` folder so GitHub Pages can serve it as-is.
  output: 'export',
  // next/image uses a Node-side loader by default; unopt it for static hosting.
  images: { unoptimized: true },
  // Pages likes directory-style URLs. Also keeps trailing-slash links stable.
  trailingSlash: true,
};

export default config;
