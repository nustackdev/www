---
title: shapes.chrome
description: "Chrome Shapes -- Card, Box, Tabs, Modal, Accordion, Form, Fieldset, Field."
---

Module `nustd.ui.shapes.chrome`.

Chrome Shapes -- Card, Box, Tabs, Modal, Accordion, Form, Fieldset, Field.

Each is a Section over its container Ref (`nustd.ui.refs.containers.chrome`):
the Ref carries the chrome methods, the slot defaults and the wire type, and
`slot(**props)` forwards to it. Declare the body as slots on a subclass and
drive the chrome off the bound Ref (`page.card.set_title(...)`).

| Name | Call | Meaning |
| --- | --- | --- |
| [Accordion](#accordion) |  | Stack of collapsible sections, each body the child at the section's id. |
| [Box](#box) |  | Styled card-like box. Pin chrome on slot(). |
| [Card](#card) |  | Card-styled Section: title + subtitle + body slots + footer. |
| [Field](#field) |  | Label + child input + help / error text. Exactly one child slot. |
| [Fieldset](#fieldset) |  | Grouped fields with a legend. Display-only, server-owned. |
| [Form](#form) |  | Semantic form wrapper. Pin chrome on slot(); submit lives on a child ButtonRef. |
| [Modal](#modal) |  | Dialog overlay. Pin chrome on slot(); declare body Refs as slots. |
| [Tabs](#tabs) |  | Tab strip plus active body, each body the child at its tab id. |

## Accordion

Stack of collapsible sections, each body the child at the section's id.

Path `nustd.ui.Accordion`.

The tab owns open state, the server owns the section list.

Undocumented: example.

## Box

Styled card-like box. Pin chrome on slot().

Path `nustd.ui.Box`.

Undocumented: example.

## Card

Card-styled Section: title + subtitle + body slots + footer.

Path `nustd.ui.Card`.

Undocumented: example.

## Field

Label + child input + help / error text. Exactly one child slot.

Path `nustd.ui.Field`.

Undocumented: example.

## Fieldset

Grouped fields with a legend. Display-only, server-owned.

Path `nustd.ui.Fieldset`.

Undocumented: example.

## Form

Semantic form wrapper. Pin chrome on slot(); submit lives on a child ButtonRef.

Path `nustd.ui.Form`.

Undocumented: example.

## Modal

Dialog overlay. Pin chrome on slot(); declare body Refs as slots.

Path `nustd.ui.Modal`.

Undocumented: example.

## Tabs

Tab strip plus active body, each body the child at its tab id.

Path `nustd.ui.Tabs`.

That is a slot named after the tab, or `tabs[id]` with an item template.

Undocumented: example.
