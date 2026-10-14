---
title: shapes.list
description: "List Shape -- a list whose slots are its items."
---

Module `nustd.ui.shapes.list`.

List Shape -- a list whose slots are its items.

class Links(List):
        docs = LinkRef.slot(label="Docs", href="/docs")
        status = BadgeRef.slot(label="live", variant="ok")

    links = Links.slot(variant="number")

Each declared slot is one item, after any plain strings in `items`. Props,
chrome and the wire type come from `ListRef`.

| Name | Call | Meaning |
| --- | --- | --- |
| [List](#list) |  | Bulleted or numbered list, one item per slot. Props as `ListRef.slot`. |

## List

Bulleted or numbered list, one item per slot. Props as `ListRef.slot`.

Path `nustd.ui.List`.

Undocumented: example.
