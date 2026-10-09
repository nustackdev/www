# landing

`nustack.dev`: home and every product page. Owns the site root and every path no other zone claims. Part of the `www` workspace, see the root README.

```bash
pnpm dev   # http://localhost:3001 (or the whole site on :3000 from the root)
```

## Layout

- `app/(home)` - pages: home, nuspace, fabrics, tools, spec, about
- `app/og` - OG image routes (pages, fabrics, tools)
- `components/` - landing-only pieces (nav, footer, site chapters); the rest comes from `@www/shared`
- `lib/` - fabric and tool registries, OG helpers
