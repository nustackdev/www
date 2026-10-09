# blog

`nustack.dev/blog`. A placeholder for now: `build.mjs` writes one static hello page to `out/`, styled with the shared tokens.

`content/` keeps the existing posts for the blog engine that replaces the placeholder. Whatever that engine is, the contract with compose stays the same: build a static `out/` meant to be served at `/blog`.

```bash
pnpm dev     # http://localhost:3003/blog (or through the site proxy on :3000)
pnpm build   # -> out/
```
