---
title: nudle.page
description: "Top-level Shape kinds for nudle, and the term that boots one."
---

Module `nustd.ui.nudle.page`.

Top-level Shape kinds for nudle, and the term that boots one.

- `Index`: the browser entrypoint. One per app. Carries structural Refs
  (document title, navigation, ...) and one slot per Page.
- `Page`: a Section an Index mounts at a route. Display Refs and Section
  slots only.
- `Boot`: the init batch for either of them, as a Nu term.

Wire-path rule: the address is the Ref chain, nothing else (see
`Ref._aresolve_address`). A segment is in a path because something
navigated through it, never because a class named itself.

- Refs rooted on an `Index` resolve from the slot down: `("title",)`
  for a structural Ref, `("home", "panel", "label")` for one inside a
  page. Two pages can both declare a `panel` and land at different
  addresses.
- Taken off the class (`HomePage.panel.label`) a Page resolves bare, like
  any Section. That is the one-page shorthand, and `Page.boot()` emits
  those bare addresses.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Boot](#boot) | `scalar_command` | `Boot(shape_cls)` | Seed one browser's tree: clear it, name it, then one `init` per slot. |
| [PageRef](#pageref) | `ref` | `PageRef(address, section_cls, parent_ref=None, owner_shape=None)` | Substrate Ref backing a Page slot on an Index. |
| [Index](#index) |  |  | Browser entrypoint. One per app. |
| [Page](#page) |  |  | Section an Index mounts at a route. |

## Boot

Seed one browser's tree: clear it, name it, then one `init` per slot.

```python
Boot(shape_cls)
```

Path `nustd.ui.Boot`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 1 (1 required).

Runs with one connection's Session bound, once per live connection and
never for anybody else's.

Three frames, in order. The clearing `remove` goes first because a
reconnect gets a fresh session with none of the old one's dynamic nodes,
which would otherwise sit there forever. Then the root write, carrying
what the shell itself needs -- the app name and whether the built-in
sidebar is on. Then the slots, in declaration order, which is render
order.

`_mutates` is declared and empty: the browser's tree root is not
something any Nu Ref names, and a mutation with no address is a local
change rather than an effect.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `shape_cls` | `type[Shape]` |  | the Index, or the lone Page, whose slots seed the tree. |

Undocumented: yields, example.

## PageRef

Substrate Ref backing a Page slot on an Index.

```python
PageRef(address, section_cls, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.PageRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

A Page is a Section with a route, so navigating into it is plain
`SectionRef` navigation (`App.home.panel.label`). The class exists so
`_page_slots` can tell a page slot from a plain section slot.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## Index

Browser entrypoint. One per app.

Path `nustd.ui.Index`.

Class body declares structural Refs as Slots (title, nav, ...) and one
Page slot per route:

```python
class App(nudle.Index):
    title = nudle.TitleRef.slot()
    home = HomePage.slot("/")
    feed = FeedPage.slot("/feed")
```

Refs rooted on an Index resolve from their slot down, so a structural
Ref is one segment and a page's Refs carry the page slot in front.

Undocumented: example.

## Page

Section an Index mounts at a route.

Path `nustd.ui.Page`.

A Page holds no mount point of its own. It gets one by being declared
as a slot on an Index, which is where its address segment comes from:

```python
class App(nudle.Index):
    home = HomePage.slot("/")
    feed = FeedPage.slot("/feed")

App.home.panel.label.set("hi")   # ("home", "panel", "label")
```

Undocumented: example.
