---
title: Planes
description: "What + creates. Grouped as the picker groups them."
---

What `+` creates. Grouped as the picker groups them.

## Basics

| Name | What |
| --- | --- |
| [Plain](#plain) | An empty plane. Add cells with /, or nest planes under it. |

### Plain

`plain` · backend `async` · module `nuverse.planes.plain`

An empty plane. Add cells with /, or nest planes under it.

The `plain` Plane: no cells, no children. First in the picker.

Not special, just first. A plain plane with nothing on it also works as a
folder: grouping in the sidebar is nesting.

## Agents

| Name | What |
| --- | --- |
| [CC chat](#cc-chat) | Talk to Claude Code. It answers by writing Nu and drawing Cells. |

### CC chat

`cc_chat` · backend `async` · cells `input` · module `nuverse.planes.cc_chat`

Talk to Claude Code. It answers by writing Nu and drawing Cells.

The `cc_chat` Plane: a chat with Claude Code, drawn as a plane of Cells.

Everything a chat does is in `agent`. This Plane is the part
that is a choice: which model the chat talks to. It is named after that
backend, so a chat on another one is another Plane beside this one, made of
the same core.

A chat is born with one Cell, `input`: a box and a send button. Pressing
send is `submit`, and the first press makes the
headless Plane that talks, nested under this one, with `TALK` as its
one Cell. Every turn after that appends its panel, its answer and a folded
box under it, so the Plane reads top to bottom as the conversation.

The talking Cell's program is a few lines that call into the package, so a
newer nuspace upgrades every chat already in the store. It is spelled into
the input Cell's source rather than imported from here, the way Jobs spells
its starter in, so a chat's Cells stand on nuspace alone.

## System

| Name | What |
| --- | --- |
| [Jobs](#jobs) | Headless planes that run code: make them, boot them, restart them. |
| [Runs](#runs) | Live plane runs and their cells, kept live. |
| [Workers](#workers) | The workers the backends hold, kept live. |
| [Planes](#planes) | Every plane by what made it, kept live. |

### Jobs

`jobs` · backend `async` · cells `jobs`, `new`, `job` · module `nuverse.planes.jobs`

Headless planes that run code: make them, boot them, restart them.

The `jobs` Plane: headless planes, made, listed and set up from one place.

A job is a plane with `props.ui` and `props.system` both false: nothing
draws it, and its one cell `main` holds its code, its id the job's with
`_main` after it, so it is unique across the space and never looked up. The jobs this Plane makes
hang under it, `made_by` `jobs`. A headless plane another Plane made is
that Plane's, eg the one a chat talks through, and not a job.

Three cells, meeting in the plane's shared state (`Jobs.selected`):

- `jobs`: every job, drawn again when a job, its boot, restart or run
  changes. A row click selects it.
- `new`: a name and a button that makes a job, starting as the `program`
  snippet, and selects it.
- `job`: the selected job's code, boot switch, restart setting and delete.
  Restart is plane level: the supervisor keeps the job running.

### Runs

`runs` · backend `async` · cells `counts`, `live`, `cells` · module `nuverse.planes.runs`

Live plane runs and their cells, kept live.

The `runs` Plane: what the kernel is running now, live.

Three cells, each drawn again when what is live changes, and only when what
it shows did: the counts, the live plane runs, and their live cell runs.
Everything is read off the live indexes, so it costs what is running, never
history. Ages move with the clock, so the tables are read again every
minute too.

### Workers

`workers` · backend `async` · cells `counts`, `workers` · module `nuverse.planes.workers`

The workers the backends hold, kept live.

The `workers` Plane: the workers the backends hold, live.

Two cells, each drawn again when what is live changes, and only when what it
shows did: the counts per backend, and every live worker with the run it
serves. Read off `workers_running`, so it costs what is up, never history.
Ages move with the clock, so the table is read again every minute too.

### Planes

`planes` · backend `async` · cells `made_by`, `planes` · module `nuverse.planes.planes`

Every plane by what made it, kept live.

The `planes` Plane: every plane in the space, live.

Two cells, each drawn again when a plane comes, goes, is renamed or has its
cells written, and only when what it shows changed: the planes and cells per
registered Plane that made them, and every plane.
