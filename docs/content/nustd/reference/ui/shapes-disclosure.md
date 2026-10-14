---
title: shapes.disclosure
description: "Disclosure Shapes -- Collapsible and Sheet."
---

Module `nustd.ui.shapes.disclosure`.

Disclosure Shapes -- Collapsible and Sheet.

Each is a Section over its container Ref (`nustd.ui.refs.containers.disclosure`):
the Ref carries `set()`, `on_change()`, the slot defaults and the wire
type, and `slot(**props)` forwards to it. Declare the body as slots on a
subclass and drive open state off the bound Ref (`page.details.set(open=True)`).

| Name | Call | Meaning |
| --- | --- | --- |
| [Collapsible](#collapsible) |  | One titled region whose slots fold away. Props as `CollapsibleRef.slot`. |
| [Sheet](#sheet) |  | Edge drawer with its slots as the body. Props as `SheetRef.slot`. |

## Collapsible

One titled region whose slots fold away. Props as `CollapsibleRef.slot`.

Path `nustd.ui.Collapsible`.

As a Shape:

```python
class Details(nustd.ui.Collapsible):
    hosts = HostsCard.slot()

class Home(nustd.ui.Page):
    details = Details.slot(title="Details", open=True)
```

Refs alone, no Shape:

```python
details = CollapsibleRef("details", parent_ref=col, props={"title": "Details"})
TextRef("note", parent_ref=details).set("folded away")
```

Undocumented: example.

## Sheet

Edge drawer with its slots as the body. Props as `SheetRef.slot`.

Path `nustd.ui.Sheet`.

As a Shape:

```python
class Inspector(nustd.ui.Sheet):
    form = EditForm.slot()

class Home(nustd.ui.Page):
    inspector = Inspector.slot(title="Edit host", side="right")

Home.inspector.set(open=True)
```

Refs alone, no Shape:

```python
sheet = SheetRef("inspector", parent_ref=col, props={"title": "Edit host"})
TextRef("note", parent_ref=sheet).set("hello") >> sheet.set(open=True)
```

Undocumented: example.
