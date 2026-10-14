---
title: refs.containers.chrome
description: "Chrome containers -- Refs for the boxes that frame their children."
---

Module `nustd.ui.refs.containers.chrome`.

Chrome containers -- Refs for the boxes that frame their children.

Card, Box (`BoxRef`), Tabs, Modal, Accordion, Form, Fieldset and
Field. Each is a `ContainerRef`: children are open-ended, and the chrome
the box carries of its own (a Card's title, a Tabs' active tab, a Field's
label) is props seeded by `slot()` and driven by `set_*`. The Shapes over
them live in `nustd.ui.shapes.chrome`.

The chrome commands (`_SetSectionStr`, `_SetTabs`, `_SetActive`) are
`Send` subclasses, so they target the abstract `Session` from core like
every other interaction and carry the Ref's chain: a Card or Tabs that does
not exist in the browser yet is created by the frame that sets its chrome. Chrome is driven off the bound Ref --
`page.card.set_title(...)` or `CardRef("c", parent_ref=col).set_title(...)`
-- and the address comes from that Ref's chain. There is no way to drive a
container off a Shape class: a class has no mount point.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AccordionRef](#accordionref) | `ref` | `AccordionRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Stack of collapsible sections, each body the child at the section's id. |
| [BoxRef](#boxref) | `ref` | `BoxRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Styled card-like box with an optional title. Pin chrome on slot(). |
| [CardRef](#cardref) | `ref` | `CardRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Card-styled container: title + subtitle + body children + footer. |
| [FieldRef](#fieldref) | `ref` | `FieldRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Label + one child input + help / error text. |
| [FieldsetRef](#fieldsetref) | `ref` | `FieldsetRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Grouped fields with a legend. Display-only, server-owned. |
| [FormRef](#formref) | `ref` | `FormRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Semantic form wrapper. Pin chrome on slot(); submit lives on a child ButtonRef. |
| [ModalRef](#modalref) | `ref` | `ModalRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Dialog overlay. Open vs closed is the thing it carries, so it has a `set()`. |
| [TabsRef](#tabsref) | `ref` | `TabsRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Tab strip plus active body. A tab's body is the child at the tab's id. |

## AccordionRef

Stack of collapsible sections, each body the child at the section's id.

```python
AccordionRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.AccordionRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The tab owns open state, the server owns the section list.

**Methods**

### `.set_sections(items)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `ListArg[dict[str, str]]` |  |  |

Undocumented: summary, example.

### `.set_open(ids)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ids` | `ListArg[str]` |  |  |

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

## BoxRef

Styled card-like box with an optional title. Pin chrome on slot().

```python
BoxRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.BoxRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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

## CardRef

Card-styled container: title + subtitle + body children + footer.

```python
CardRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.CardRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_title(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_subtitle(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_footer(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

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

## FieldRef

Label + one child input + help / error text.

```python
FieldRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.FieldRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_help(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_error(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_required(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## FieldsetRef

Grouped fields with a legend. Display-only, server-owned.

```python
FieldsetRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.FieldsetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_legend(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_gap(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FieldsetGap \| StrArg` |  |  |

Undocumented: summary, example.

### `.set_disabled(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

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

## FormRef

Semantic form wrapper. Pin chrome on slot(); submit lives on a child ButtonRef.

```python
FormRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.FormRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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

## ModalRef

Dialog overlay. Open vs closed is the thing it carries, so it has a `set()`.

```python
ModalRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ModalRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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

## TabsRef

Tab strip plus active body. A tab's body is the child at the tab's id.

```python
TabsRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.TabsRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_tabs(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `ListArg[dict[str, str]]` |  |  |

Undocumented: summary, example.

### `.set_active(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

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
