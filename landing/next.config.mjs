import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** Landing owns the site root: every path no other zone claims. */
const ZONE = '';

/** @type {(phase: string) => import('next').NextConfig} */
const config = (phase) => ({
  // Dev-only routes are `page.dev.tsx` (eg a throwaway lab route): `next dev` serves them, builds never see them.
  pageExtensions: phase === PHASE_DEVELOPMENT_SERVER ? ['dev.tsx', 'tsx', 'ts', 'jsx', 'js'] : ['tsx', 'ts', 'jsx', 'js'],
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
});

export default config;
