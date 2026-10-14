---
title: shapes.line
description: "Line Shape -- slots that run inline, wrapping like a paragraph."
---

Module `nustd.ui.shapes.line`.

Line Shape -- slots that run inline, wrapping like a paragraph.

A Section over `LineRef`: `_ref_cls` names the Ref, the wire type and
the slot defaults come from it, and `slot(**props)` hands the props over
as they are.

    class Status(Line):
        lead = TextRef.slot(value="press")
        combo = ShortcutRef.slot(keys=["mod", "K"])
        tail = TextRef.slot(value="to search")

    status = Status.slot(wrap=False)

| Name | Call | Meaning |
| --- | --- | --- |
| [Line](#line) |  | Its slots inline, wrapping like a paragraph. Props as `LineRef.slot`. |

## Line

Its slots inline, wrapping like a paragraph. Props as `LineRef.slot`.

Path `nustd.ui.Line`.

Undocumented: example.
