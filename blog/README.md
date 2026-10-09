# blog

`nustack.dev/blog`: an Astro site. Part of the `www` workspace, see the root README.

```bash
pnpm dev       # http://localhost:3003/blog/ (or the whole site on :3000 from the root)
pnpm build     # static site in out/, merged under /blog by compose
pnpm preview   # serve out/ at http://localhost:3003/blog/
```

`dev` binds 127.0.0.1 for the site proxy, and passes `--ignore-lock` so Astro stays in the foreground when it detects a coding agent (it backgrounds itself otherwise, which the proxy cannot stop).

## Writing a post

Add `content/<slug>.mdx` (or `.md`). The file name is the URL: `/blog/<slug>/`.

```mdx
---
title: "Post title"
description: "One or two sentences. Used for the index, RSS, OG card and search results."
date: "2026-10-09"
author: "gor"          # defaults to nustack
tags: ["release", "nu"]
draft: true            # optional: shows in dev, left out of the build
---

Markdown from here. Code fences get syntax highlighting in both themes.
```

Every post gets an OG image, an RSS entry, a sitemap entry and a comments thread. Nothing else to register.

## Layout

- `content/` - posts
- `src/content.config.ts` - the post schema
- `src/pages` - index, post pages, `rss.xml`, `sitemap.xml`, OG images (`og/<slug>/image.png`)
- `src/layouts/Base.astro` - head tags, theme script, the shared nav (React island), page and footer
- `src/components` - the nav island and giscus comments
- `src/shims` - `next/link` and `next/navigation` for the shared kit
- `src/styles` - site stylesheet and post typography

## Comments

giscus, backed by GitHub Discussions on `nustackdev/www` (category Announcements). Each post maps to a discussion by pathname; the discussion is created on the first comment or reaction. IDs live in `src/lib/giscus.ts`.
