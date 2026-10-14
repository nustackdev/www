---
title: refs.containers.list
description: "`ListRef` -- a bulleted or numbered list whose items are any nodes."
---

Module `nustd.ui.refs.containers.list`.

`ListRef` -- a bulleted or numbered list whose items are any nodes.

A container. Plain string items render first, from the `items` prop, the
way the list always drew; then every child node is one more item after
them. Indexed children (`list[0]`, from an item template) draw in index
order; named ones in the order they were first written. There is no item Ref: any child is
an item, so a Badge, a Link or a whole Row can each be one.

The string half stays for compatibility and because short text lists are
common: `set(items)` replaces the strings whole, `append` adds one to
the end, `clear` empties them, and none of the three touches the child
nodes. That makes it the one container with a `set()` that is not chrome.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ListRef](#listref) | `ref` | `ListRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | A bulleted or numbered list: string items first, then each child node. |

## ListRef

A bulleted or numbered list: string items first, then each child node.

```python
ListRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ListRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

One string per item, drawn as given. `set` replaces the strings whole,
`append` adds one to the end. `start` is the first number of a numbered
list, and child nodes carry the numbering on after the strings. Composes
the kit List primitive, which draws a list the way a markdown list
renders in prose.

Wire type stays "ListRef" so a bundle from before lists took children
still draws the strings.

**Methods**

### `.set(items, variant=<UNSET>, start=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `ListArg[str]` |  |  |
| `variant` | `ListVariant \| StrArg` | `<UNSET>` |  |
| `start` | `IntArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.set_variant(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `ListVariant \| StrArg` |  |  |

Undocumented: summary, example.

### `.append(item)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `item` | `StrArg` |  |  |

Undocumented: summary, example.

### `.clear()`

Builds `Nu`.

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.refs.containers.base.ListContainerRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `Ref` |  |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.
