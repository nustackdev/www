/** Landing owns the site root: every path no other zone claims. */
const ZONE = '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Read by @www/shared/lib/zones to tell in-zone links from cross-zone ones.
  env: { NEXT_PUBLIC_ZONE: ZONE },
  // Shared kit ships as TS source; Next compiles it with the app.
  transpilePackages: ['@www/shared'],
  // Emit a static `out/` folder; compose merges it into the site root.
  output: 'export',
  // next/image uses a Node-side loader by default; unopt it for static hosting.
  images: { unoptimized: true },
  // Pages likes directory-style URLs. Also keeps trailing-slash links stable.
  trailingSlash: true,
};

export default config;
