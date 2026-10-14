---
title: shapes.flow
description: "Flow Shapes -- Column and Row, declared."
---

Module `nustd.ui.shapes.flow`.

Flow Shapes -- Column and Row, declared.

Each is a Section over its container Ref: `_ref_cls` names the Ref, the
wire type and the slot defaults come from it, and `slot(**props)` hands
the props over as they are.

    class Toolbar(Row):
        text = TextRef.slot()
        btn = ButtonRef.slot()

    bar = Toolbar.slot(gap=3, wrap=True)

| Name | Call | Meaning |
| --- | --- | --- |
| [Column](#column) |  | Vertical stack of its slots. Props as `ColumnRef.slot`. |
| [Row](#row) |  | Its slots side by side. Props as `RowRef.slot`. |

## Column

Vertical stack of its slots. Props as `ColumnRef.slot`.

Path `nustd.ui.Column`.

Undocumented: example.

## Row

Its slots side by side. Props as `RowRef.slot`.

Path `nustd.ui.Row`.

Undocumented: example.
