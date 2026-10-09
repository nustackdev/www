# landing

`nustack.dev`: home and every product page. Owns the site root and every path no other zone claims. Part of the `www` workspace, see the root README.

```bash
pnpm dev   # http://localhost:3001 (or the whole site on :3000 from the root)
```

## Layout

- `app/(home)` - pages: home, nuspace, fabrics, tools, spec, about
- `app/og` - OG image routes (pages, fabrics, tools)
- `components/` - landing-only pieces (site chapters, page wrapper); nav, footer and the fabric/tool registries come from `@www/shared`
- `lib/` - OG helpers
