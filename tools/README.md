# docsgen

Generates the reference docs from the code: `nu/reference/`, `nustd/reference/`
and `nuspace/reference/` from `nu.inspect`, and `nuverse/reference/` from the
nuspace extension registry.

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
tools/.venv/bin/python -m docsgen --only nustd.kv
tools/.venv/bin/python -m docsgen --tree
```

## Set it up

```bash
cd tools && uv venv --python 3.12 && uv pip install -e .
```

The packages are pinned to released versions in `pyproject.toml`, because
the output is committed and regenerating is an explicit act tied to a version.
On a release, bump the pins, reinstall, run `pnpm run docs:gen` and commit the
result with the bump.

## What it writes

There is no list of modules. `docsgen/discover.py` walks the installed
distributions and the module tree that comes out is the page tree, so a module
nobody remembered to list still gets documented.

Each distribution lands in the `reference/` folder of its own docs section:
`nucore` in `nu/reference/`, `nustd` in `nustd/reference/`, `nuspace` in
`nuspace/reference/`. Below that the docs path mirrors the module path, so
`nu.core.flows` is `nu/reference/core/flows` and `nustd.kv` is
`nustd/reference/kv`. The ten fabric pages fall out of that on their own, and
`check_fabrics` refuses to generate the day one of them moves.

Page or section is derived, not decided:

- **A subpackage its parent re-exports is a section of the parent's page.**
  `nu.core` publishes what `nu.core.arithmetic` defines, so arithmetic is
  `## arithmetic` on the core page.
- **A subpackage the parent does not re-export is its own page, nested under
  it.** `nu.core` publishes nothing from `nu.core.flows`, so flows is
  `nu/reference/core/flows`.
- **A package with no subjects and no documented descendant is not a page.**
  There is nothing on it to document. With descendants it becomes a landing
  page: its docstring over a table of what is under it, which is what
  `nu.domains`, `nu.std` and `nu.inspect.core` are.

A page is one file, or a folder. Past `SPLIT` lines (600) with more than one
section, or as soon as another page nests under it, it becomes `<slug>/index.md`
holding the module prose and one summary table per section, plus
`<slug>/<section>.md` per section holding the full entries. Fumadocs serves
`kv/index.md` at the same URL `kv.md` served, so the split is invisible to the
hardcoded links in
`docs/content/nu/index.mdx`. A single-section page with no nested page never
splits, however long: the code declares no seam to cut it on.

A section's filename is its dotted module path minus the page's own prefix, so
`nu.mem.refs.std` under `nu.mem` is `refs-std.md`. A section defined outside the
page's package keeps its full path. A nested page's name is its module's, and a
section that would collide with one yields.

It owns every markdown file under each `reference/` folder and deletes what it
stops writing: a page that crosses the threshold in either direction, or a
module that is renamed or removed, leaves a file that still resolves to a URL
in fumadocs, so `docsgen` removes it and `--check` reports it as an orphan.

Two things it deliberately never writes:

- **`meta.json`.** Sidebar order is a teaching sequence (fabrics before `std`
  inside `nustd`, the builtin families before flows and spans inside `nu.core`)
  and that intent exists nowhere in the code. Those files stay handwritten,
  including the one per page folder. Never list `"index"` in a `pages` array:
  fumadocs then renders the index as a duplicate child instead of making the
  folder itself link to it.
- **The ten fabric URLs.** The fabric table on `docs/content/nu/index.mdx`
  links each fabric's page by hand (`nu.mem` plus nine in `nustd`), so their
  paths are asserted rather than assumed.

When a module appears or a section is renamed, fumadocs hides any page its
folder's `meta.json` does not list. After a regen that adds pages, add them to
the `meta.json` next to them.

## Extensions

nuverse has no API worth a module walk: its surface is what the `+` and `/`
menus offer. `docsgen/extensions.py` reads it off the `nuspace.extensions`
entry points, the registry nuspace itself reads, and writes three pages per
extension: a landing page, `planes.md` and `snippets.md`, grouped under the
headings the menus show. Each entry is the spec's fields, its one-liner, and
the docstring of the module that documents it.

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
| `docsgen/pages.py` | the decisions: the distributions, the extensions, the skip list, the fabric modules, the split threshold |
| `docsgen/discover.py` | walks the distributions, derives the page tree |
| `docsgen/collect.py` | runs the six catalogues, groups subjects into sections |
| `docsgen/model.py` | `Page`, `Section`, `Root` |
| `docsgen/render.py` | records to markdown |
| `docsgen/extensions.py` | the extension registry to catalogue pages |
| `docsgen/prose.py` | reStructuredText leftovers to markdown |
| `docsgen/__main__.py` | the command, including `--check` |
