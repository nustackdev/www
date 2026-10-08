# nustack.dev

Nu website + docs + blog. Part of the `www` workspace, see the root README.

```bash
pnpm dev   # http://localhost:3000
```

## Layout

- `app/(home)` - landing
- `app/docs` - docs shell
- `content/docs` - MDX source (Catalogue, Guides, Nudle)
- `components/` - site-only pieces (nav, footer, mdx, site chapters); the rest comes from `@www/shared`
- `lib/source.ts` - content adapter · `lib/shared.ts` - app + git config
- `source.config.ts` - MDX + frontmatter schema
- `tools/` - docsgen, generates `content/docs/reference/`
