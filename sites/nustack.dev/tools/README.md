# docsgen

Generates `content/docs/reference/` from `nu.inspect`.

The code is the source of truth for every fact on a reference page. Names,
sorts, call forms, argument defaults, what an atom yields, its notes and its
worked examples all live on the class, so the pages read them off the records
instead of restating them by hand.

## Run it

```bash
pnpm run docs:gen          # write the pages
pnpm run docs:gen:check    # write nothing, exit 1 when committed output is stale
```

`docs:gen:check` prints a unified diff per stale page, so it works as a CI gate.

Generate one page, or print the tree without writing anything:

```bash
tools/.venv/bin/python -m docsgen --only nu.mem
tools/.venv/bin/python -m docsgen --tree
```

## Set it up

```bash
cd tools && uv venv --python 3.12 && uv pip install -e .
```

**The nu dependency is a local editable path, on purpose.** Wave B1 of
task-142 (the `nu.inspect` extension this tool reads) is not released yet, so
`pyproject.toml` points `nucore` and `nustd` at `../../nu/packages/*` through
`[tool.uv.sources]`. That makes the output depend on whatever is checked out
next door, which is wrong for a generator whose whole point is that
regenerating is an explicit act tied to a version.

**When B1 ships, drop the `[tool.uv.sources]` block and pin the release:**
`nucore==<version>` and `nustd[all]==<version>`.

## What it writes

There is no list of modules. `docsgen/discover.py` walks the two installed
distributions and the module tree that comes out is the page tree, so a module
nobody remembered to list still gets documented.

The top level mirrors what people install: `reference/nu/` is what `nucore`
ships, `reference/nustd/` is what `nustd` ships. Below that the docs path
mirrors the module path, so `nu.core` is `reference/nu/core`, `nu.core.flows`
is `reference/nu/core/flows` and `nu.std.math` is `reference/nustd/std/math`.
The ten fabric slugs fall out of that on their own, and `check_fabrics` refuses
to generate the day one of them moves.

Page or section is derived, not decided:

- **A subpackage its parent re-exports is a section of the parent's page.**
  `nu.core` publishes what `nu.core.arithmetic` defines, so arithmetic is
  `## arithmetic` on the core page.
- **A subpackage the parent does not re-export is its own page, nested under
  it.** `nu.core` publishes nothing from `nu.core.flows`, so flows is
  `reference/nu/core/flows`.
- **A package with no subjects and no documented descendant is not a page.**
  There is nothing on it to document. With descendants it becomes a landing
  page: its docstring over a table of what is under it, which is what
  `nu.domains`, `nu.std` and `nu.inspect.core` are.

A page is one file, or a folder. Past `SPLIT` lines (600) with more than one
section, or as soon as another page nests under it, it becomes `<slug>/index.md`
holding the module prose and one summary table per section, plus
`<slug>/<section>.md` per section holding the full entries. Fumadocs serves
`mem/index.md` at the same URL `mem.md` served, so the split is invisible to
`lib/refs.ts`, the ten marketing pages and the hardcoded links in
`content/docs/index.mdx`. A single-section page with no nested page never
splits, however long: the code declares no seam to cut it on.

A section's filename is its dotted module path minus the page's own prefix, so
`nu.mem.refs.std` under `nu.mem` is `refs-std.md`. A section defined outside the
page's package keeps its full path. A nested page's name is its module's, and a
section that would collide with one yields.

It deletes what it stops owning: when a page crosses the threshold in either
direction, the file or folder left behind still resolves to a URL in fumadocs,
so `docsgen` removes it and `--check` reports it as an orphan.

Two things it deliberately never writes:

- **`meta.json`.** Sidebar order is a teaching sequence (fabrics before `std`
  inside `nustd`, the builtin families before flows and spans inside `nu.core`)
  and that intent exists nowhere in the code. Those files stay handwritten,
  including the one per page folder. Never list `"index"` in a `pages` array:
  fumadocs then renders the index as a duplicate child instead of making the
  folder itself link to it.
- **The ten fabric slugs.** `lib/refs.ts` builds `/docs/reference/nustd/<slug>`
  and every marketing fabric page links off it, so `kv, ui, cluster, llm, mem,
  proxy, http, service, cc, mp` are asserted rather than assumed.

## Labels are short, paths are not gone

A sidebar label is the last segment only: `nu > core > flows`, not
`nu > nu.core > nu.core.flows`. The ancestry is already in the URL, and a
section heading is `## arithmetic` for the same reason. The full dotted path
stays one line away: a page states its module under its title, a section states
its own under its heading, every subject carries its path in the metadata
strip, and every landing-page table names its children in full.

## The rule

Nothing on a page is invented by the renderer. Where a record is thin the page
says `Undocumented: ...` and stops. The fix is a docstring in `nu`, never prose
in this tool.

## Layout

| File | What |
| --- | --- |
| `docsgen/pages.py` | the decisions: the two distributions, the skip list, the fabric slugs, the split threshold |
| `docsgen/discover.py` | walks the distributions, derives the page tree |
| `docsgen/collect.py` | runs the six catalogues, groups subjects into sections |
| `docsgen/model.py` | `Page`, `Section`, `Root` |
| `docsgen/render.py` | records to markdown |
| `docsgen/prose.py` | reStructuredText leftovers to markdown |
| `docsgen/__main__.py` | the command, including `--check` |
