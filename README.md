# www

The nustack.dev website. One pnpm workspace, one app per section, composed into one static site at build time.

| Path | What | Serves |
| --- | --- | --- |
| `landing/` | `@www/landing`: Next app, home and every product page (nu, nuspace, fabrics, tools, spec, about) | `/` and every path no other zone claims |
| `docs/` | `@www/docs`: Next + fumadocs, MDX in `docs/content` | `/docs` |
| `blog/` | `@www/blog`: placeholder hello page until the blog engine lands, posts kept in `blog/content` | `/blog` |
| `shared/` | `@www/shared`: design tokens, page primitives, brand marks, nav pieces, zones, analytics | - |
| `compose/` | `@www/compose`: merges the builds into `out/`, site-wide search, dev proxy, preview server | - |
| `tools/` | docsgen: generates `docs/content/reference/` from `nu.inspect` | - |

Next 16 · React 19 · Tailwind 4 · TS, static export.

```bash
pnpm i
pnpm dev            # whole site behind http://localhost:3000
pnpm dev:docs       # one app on its own port (landing :3001, docs :3002, blog :3003)
pnpm build          # every app, then compose -> out/
pnpm serve          # preview out/ at http://localhost:4000, Pages-like
pnpm docs:gen       # regenerate the reference docs (tools/.venv)
```

## Zones

Each app owns one path prefix (a zone) and builds on its own: its own engine, dependencies and config. Only docs depends on fumadocs, so its CSS never reaches the landing or the blog. Every app has its own root layout and stylesheet; they share the tokens from `shared/design`.

- **Apps.** A zone app builds a static `out/` meant to be served under its prefix. For Next that is `basePath` plus `NEXT_PUBLIC_ZONE` in `next.config.mjs`. The list of apps lives in `compose/apps.mjs`, the list of prefixes in `shared/lib/zones.ts`.
- **Links.** Write hrefs as site-absolute paths (`/docs/x`, `/fabrics/kv`). `SiteLink` from the shared kit keeps links inside the current zone client-side and turns links into another zone into plain `<a>`, since that zone is a different build. Docs plugs the same resolver into fumadocs through `docs/components/provider.tsx`.
- **Theme.** next-themes everywhere, same `theme` key, so the chosen theme carries across zones.
- **Search.** compose runs Pagefind over the merged HTML, so the shared `SearchDialog` searches every zone. Pages opt in with `data-pagefind-body`. Docs also keeps fumadocs' own search. In dev, `/pagefind` is served from the last `pnpm build`.

## Compose

`pnpm build` builds every app, then `compose/build.mjs` copies landing to `out/` and every other app to `out/<zone>`, merges the apps' sitemaps into `/sitemap.xml`, copies the docs' `llms.txt` to the root and indexes everything with Pagefind.

`pnpm dev` starts every app's dev server and a proxy on `:3000` that routes by prefix, HMR included.

## Shared kit

Apps import it by path: `@www/shared/components/page`, `@www/shared/lib/zones`, `@www/shared/design/tokens.css`. It ships as TS source, each Next app compiles it (`transpilePackages`). Anything that names an app's own pages, nav or copy stays in that app.

## Deploy

Push to `main` runs `.github/workflows/deploy.yml`: build every app, compose, publish `out/` with GitHub Pages from this repo at nustack.dev. Work happens on `dev`; deploy by fast-forwarding `main` to `dev`.
