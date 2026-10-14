---
title: refs.containers.line
description: "`LineRef` -- inline flow: children run and wrap like words in a paragraph."
---

Module `nustd.ui.refs.containers.line`.

`LineRef` -- inline flow: children run and wrap like words in a paragraph.

A Line is how text runs, links, badges, keys and status dots sit in one
sentence. A plain string is still a `TextRef` and prose is still Markdown;
a Line is for the sentence that mixes a value or a control into the words.

The props are the container's own and nothing else: where the runs sit
(`align`) and whether they wrap (`wrap=False` keeps one line and clips
the end with an ellipsis). A child carries no placement props: the Line's
inline flow decides how it draws, so the same Badge that is a block in a
Column is a run of text here.

As Refs alone, no Shape:

    line = LineRef("status", parent_ref=card, props={"wrap": False})
    TextRef("lead", parent_ref=line).set("Built with")
    BadgeRef("tag", parent_ref=line).set("0.6")

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [LineRef](#lineref) | `ref` | `LineRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Children inline, wrapping at the container's width. Pin chrome on slot(). |

## LineRef

Children inline, wrapping at the container's width. Pin chrome on slot().

```python
LineRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.LineRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nustd.ui.refs.containers.base.ListContainerRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `Ref` |  |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.
