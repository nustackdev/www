---
title: refs.containers.disclosure
description: "Disclosure containers -- a region that opens and closes over its children."
---

Module `nustd.ui.refs.containers.disclosure`.

Disclosure containers -- a region that opens and closes over its children.

- `CollapsibleRef`: one titled region that folds, simpler than Accordion.
  The tab owns open state while the user clicks (like Accordion) and sends a
  notify on each toggle; the server can still open or close it.
- `SheetRef`: an edge drawer, Modal's sibling for inspectors and side
  panels. The server owns open state; the tab sends `{open: false}` when
  the user dismisses it.

Open vs closed is the thing each one carries, so each has a `set()` for
it, the way Modal does. Every other child is open-ended composition: build
it as a slot on the Shape or as a Ref with `parent_ref=` this one.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [CollapsibleRef](#collapsibleref) | `ref` | `CollapsibleRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | One titled region whose children fold away. |
| [SheetRef](#sheetref) | `ref` | `SheetRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Drawer that slides in from an edge over the page, children as its body. |

## CollapsibleRef

One titled region whose children fold away.

```python
CollapsibleRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.CollapsibleRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

A trigger row (chevron + title) over a body of open-ended children. The
user toggles it in the tab, which sends `{open: bool}` as a notify;
`on_change()` takes those. `set(open=...)` opens or closes it from
the server.

**Methods**

### `.set_open(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_title(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set(open=<UNSET>, title=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `open` | `BoolArg` | `<UNSET>` |  |
| `title` | `StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.on_change()`

Builds `Changed`.

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.refs.containers.base.DictContainerRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `Ref` |  |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## SheetRef

Drawer that slides in from an edge over the page, children as its body.

```python
SheetRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SheetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Server-owned `open` and `title`. When `dismissible` is true the user
can close it (backdrop, Esc, the close button) and the tab sends
`{open: false}`, which `on_change()` takes. Like Modal, the sheet
stays open until the program writes `open=False` back, so a program
can hold it open (unsaved edits). `size` is the width of a left or
right sheet and the height of a top or bottom one.

**Methods**

### `.set_open(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_title(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set(open=<UNSET>, title=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `open` | `BoolArg` | `<UNSET>` |  |
| `title` | `StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.on_change()`

Builds `Changed`.

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.refs.containers.base.DictContainerRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `Ref` |  |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.
