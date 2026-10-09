# www

Websites for nustack. One pnpm workspace, one shared kit, one deploy per site.

| Path | What | Deploys to |
| --- | --- | --- |
| `sites/nustack.dev` | Nu website + docs + blog | [nustack.dev](https://nustack.dev) via `nustackdev/nustack.dev` |
| `sites/nuspace.si` | nuspace website | [nuspace.si](https://nuspace.si) via `nustackdev/nuspace.si` |
| `shared` | `@www/shared`: design tokens, landing primitives, brand marks, analytics | - |

Next 16 · React 19 · Tailwind 4 · TS, static export.

```bash
pnpm i
pnpm dev:nustack   # http://localhost:3000
pnpm dev:nuspace   # http://localhost:3001
pnpm build         # both sites -> sites/*/out
```

## Shared kit

Sites import it by path: `@www/shared/components/page`, `@www/shared/lib/hue`, `@www/shared/design/tokens.css`.
It ships as TS source, each site compiles it (`transpilePackages`). Anything that names a
site's own pages, nav or copy stays in that site. Each site wraps the shared `Page` with its own footer
in `components/page/`.

## Deploy

Push to `main` runs `.github/workflows/deploy-<site>.yml` for every site whose files (or the shared kit)
changed. The workflow builds the static export and pushes it to the `gh-pages` branch of the site's
repo, which serves it on GitHub Pages with its custom domain. The target repos hold only build output.
