import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const shim = (name) => fileURLToPath(new URL(`./src/shims/${name}`, import.meta.url));

// The blog zone: a static Astro build served at nustack.dev/blog. compose
// merges `out/` into the site under /blog, so base and outDir are the
// contract; the rest is the blog's own business.
export default defineConfig({
  site: 'https://nustack.dev',
  base: '/blog',
  trailingSlash: 'always',
  outDir: 'out',
  build: { format: 'directory' },
  integrations: [mdx(), react()],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  vite: {
    plugins: [tailwindcss()],
    // The shared kit reads its zone from NEXT_PUBLIC_ZONE, like the Next apps.
    define: { 'process.env.NEXT_PUBLIC_ZONE': JSON.stringify('/blog') },
    resolve: {
      // The kit's nav is written against next/link and next/navigation.
      alias: {
        'next/link': shim('next-link.tsx'),
        'next/navigation': shim('next-navigation.ts'),
      },
      dedupe: ['react', 'react-dom', 'next-themes'],
    },
    // resvg is a native module for the OG endpoint; keep it out of Vite's bundling.
    ssr: { noExternal: ['@www/shared'], external: ['@resvg/resvg-js'] },
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  },
});
