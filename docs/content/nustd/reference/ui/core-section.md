---
title: core.section
description: "Section -- shape-based container primitive for the UI kit."
---

Module `nustd.ui.core.section`.

Section -- shape-based container primitive for the UI kit.

A Section is a Shape (not a Ref) that groups other Refs and Sections as
declared slots. It is layer 2, a declarative DSL over the container Refs:
the shipped Shapes (Row, Column, Card, Tabs, ...) each point `_ref_cls`
at their container Ref, take their wire type from it, and forward slot
props to it. User code subclasses those.

A Section carries no mount point. It is a blueprint: the same subclass can
sit under as many parents as you like, and where it lands is decided by the
Ref chain that reaches it.

SectionRef is the substrate Ref under every container. Attribute access on
a bound SectionRef that carries a Section (e.g. `page.toolbar.text`) walks
into the section's child slots. One built alone, with no Section, is still
a whole container: its children are Refs built with `parent_ref=` it.
Chrome a container can drive (Card's title, Tabs' active tab, ...) lives on
its Ref, so the write targets the bound Ref and resolves through the chain
like everything else.

Children by key or index: `Grid.slot(SpeciesCard)` declares an item
template on the slot, and `ref["lion"]` is a SpeciesCard there. The
template rides the Ref's payload; whether a container takes one is its kind
(see `refs.containers.base`).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SectionRef](#sectionref) | `ref` | `SectionRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Substrate Ref under every container. |
| [Section](#section) |  |  | Base for shape-based layout primitives. |

## SectionRef

Substrate Ref under every container.

```python
SectionRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SectionRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Created by `Section.slot()` and exposed at the parent (Page or another
Section) level, it carries `section_cls` and attribute access returns
a child Ref whose `parent` is this SectionRef. `section_cls` is
optional: a container Ref built alone has no Shape to navigate, and its
children are built as Refs with `parent_ref=` it.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## Section

Base for shape-based layout primitives.

Path `nustd.ui.Section`.

Subclass to declare child slots and pin chrome defaults:

    class Toolbar(Row):
        text = TextRef.slot()
        btn = ButtonRef.slot()

    bar = Toolbar.slot(gap=3)

A Section subclass holds no mount point, so the same one can be
declared on several pages at once.

Undocumented: example.
