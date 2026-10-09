---
title: refs.layout
description: "Layout Sections -- Shape-based containers that wrap other Refs."
---

Module `nustd.ui.refs.layout`.

Layout Sections -- Shape-based containers that wrap other Refs.

Most of these are `Section` subclasses (not Refs) -- Shape-based
composition primitives that mount other Refs and Sections. Section
and SectionRef come from `nustd.ui.core`; this module defines the
concrete layout primitives (Row, Column, Card, Tabs, Modal, Field,
Fieldset, Form, Accordion) that build on them, plus the chrome
interactions those primitives expose.

The chrome commands (`_SetSectionStr`, `_SetTabs`, `_SetActive`) target
the abstract `Session` from core -- so this module is host-agnostic;
any host that implements `Session` runs it. Chrome that writes to the
section itself (a Card's title, a Tabs' active tab) lives on a SectionRef
subclass, so it is driven off the bound Ref -- `page.card.set_title(...)`
-- and the address comes from that Ref's chain. There is no way to drive a
section off its class: a class has no mount point.

| Name | Call | Meaning |
| --- | --- | --- |
| [Accordion](#accordion) |  | Stack of collapsible sections. Tab owns open state, server owns the section list. |
| [Card](#card) |  | Card-styled Section: title + subtitle + body slots + footer. |
| [Column](#column) |  | Vertical flex layout. Pin chrome on the slot(). |
| [Container](#container) |  | Styled card-like box. Pin chrome on slot(). |
| [Field](#field) |  | Label + child input + help / error text. Exactly one child slot. |
| [Fieldset](#fieldset) |  | Grouped fields with a legend. Display-only, server-owned. |
| [Form](#form) |  | Semantic form wrapper. Pin chrome on slot(); submit lives on a child ButtonRef. |
| [Modal](#modal) |  | Dialog overlay. Pin chrome on slot(); declare body Refs as slots. |
| [Row](#row) |  | Horizontal flex layout. Pin chrome on slot(). |
| [Tabs](#tabs) |  | Tab strip plus active body. Subclass and declare one child slot per tab body. |

## Accordion

Stack of collapsible sections. Tab owns open state, server owns the section list.

Path `nustd.ui.Accordion`.

Undocumented: example.

## Card

Card-styled Section: title + subtitle + body slots + footer.

Path `nustd.ui.Card`.

Undocumented: example.

## Column

Vertical flex layout. Pin chrome on the slot().

Path `nustd.ui.Column`.

Undocumented: example.

## Container

Styled card-like box. Pin chrome on slot().

Path `nustd.ui.Container`.

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

## Row

Horizontal flex layout. Pin chrome on slot().

Path `nustd.ui.Row`.

Undocumented: example.

## Tabs

Tab strip plus active body. Subclass and declare one child slot per tab body.

Path `nustd.ui.Tabs`.

Undocumented: example.
