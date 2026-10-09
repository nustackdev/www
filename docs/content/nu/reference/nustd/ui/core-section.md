---
title: core.section
description: "Section -- shape-based container primitive for the UI kit."
---

Module `nustd.ui.core.section`.

Section -- shape-based container primitive for the UI kit.

A Section is a Shape (not a Ref) that groups other Refs and Sections as
declared slots. Concrete layout primitives (Row, Column, Card, Tabs, ...)
subclass Section and pin chrome defaults; user code subclasses those.

A Section carries no mount point. It is a blueprint: the same subclass can
sit under as many parents as you like, and where it lands is decided by the
Ref chain that reaches it.

SectionRef is the substrate Ref that backs a Section slot. Attribute
access on a bound SectionRef (e.g. `page.toolbar.text`) walks into the
section's child slots. A Section whose own chrome is drivable (Card's
title, Tabs' active tab, ...) points `_ref_cls` at a SectionRef subclass
carrying those methods, so the write targets the bound Ref and resolves
through the chain like everything else.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SectionRef](#sectionref) | `ref` | `SectionRef(address, section_cls, parent_ref=None, owner_shape=None)` | Substrate Ref backing a Section slot. |
| [Section](#section) |  |  | Base for shape-based layout primitives. |

## SectionRef

Substrate Ref backing a Section slot.

```python
SectionRef(address, section_cls, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.SectionRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Instances are created by `Section.slot()` and exposed at the parent
(Page or another Section) level. Carries `section_cls`; attribute
access returns a child Ref whose `parent` is this SectionRef.

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
        gap = 3
        text = TextRef.slot()
        btn = ButtonRef.slot()

A Section subclass holds no mount point, so the same one can be
declared on several pages at once.

Undocumented: example.
