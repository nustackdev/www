---
title: Snippets
description: "What / inserts. Grouped as the menu groups them."
---

What `/` inserts. Grouped as the menu groups them.

## Content

| Name | What |
| --- | --- |
| [Text](#text) | Text a person reads and edits, markdown kept in the cell's state. |
| [Table](#table) | An editable data table, rows and columns kept in the cell's state. |

### Text

`text` · searchable · module `nuverse.snippets.prose`

Text a person reads and edits, markdown kept in the cell's state.

The `text` snippet: a text editor cell, its text kept in the cell's state.

Registered under `TEXT`, it is the space's text snippet:
typing into an empty line starts one, and its cells are the plane's text
cells.

**Ops**

| Op | What |
| --- | --- |
| `set_text` | Replace a text cell's text, markdown. A no-op when the cell is missing. |
| `text_of` | A text cell's text, `""` before anything is written. Bare: wrap it in `ops.snapshot`. |

### Table

`table` · module `nuverse.snippets.table`

An editable data table, rows and columns kept in the cell's state.

The `table` snippet: an editable data table, its rows kept in the cell's state.

## Inputs

| Name | What |
| --- | --- |
| [Text input](#text-input) | A line of text kept in the cell's state. |
| [Number](#number) | A number kept in the cell's state, with its bounds and step under Config. |
| [Slider](#slider) | A number on a slider kept in the cell's state, its range under Config. |
| [Switch](#switch) | An on or off kept in the cell's state. |
| [Select](#select) | One option of a list kept in the cell's state, its options under Config. |
| [Date](#date) | A date kept in the cell's state, picked from a calendar. |

### Text input

`text_input` · searchable · module `nuverse.snippets.text_input`

A line of text kept in the cell's state.

The `text_input` snippet: a text input cell, its value kept in the cell's state.

**Ops**

| Op | What |
| --- | --- |
| `set_value` | Set a text input cell's value. A no-op when the cell is missing. |
| `value_of` | A text input cell's value, `""` before one is set. Bare: wrap it in `ops.snapshot`. |

### Number

`number` · searchable · module `nuverse.snippets.number`

A number kept in the cell's state, with its bounds and step under Config.

The `number` snippet: a number input cell, its value kept in the cell's state.

**Ops**

| Op | What |
| --- | --- |
| `set_value` | Set a number cell's number. A no-op when the cell is missing. |
| `value_of` | A number cell's number, `0.0` before one is set. Bare: wrap it in `ops.snapshot`. |

### Slider

`slider` · searchable · module `nuverse.snippets.slider`

A number on a slider kept in the cell's state, its range under Config.

The `slider` snippet: a slider cell, its value kept in the cell's state.

**Ops**

| Op | What |
| --- | --- |
| `set_value` | Set a slider cell's value. A no-op when the cell is missing. |
| `value_of` | A slider cell's value, `0.0` before one is set. Bare: wrap it in `ops.snapshot`. |

### Switch

`switch` · searchable · module `nuverse.snippets.switch`

An on or off kept in the cell's state.

The `switch` snippet: a switch cell, its value kept in the cell's state.

**Ops**

| Op | What |
| --- | --- |
| `set_value` | Set a switch cell's value. A no-op when the cell is missing. |
| `value_of` | A switch cell's value, `False` before one is set. Bare: wrap it in `ops.snapshot`. |

### Select

`select` · searchable · module `nuverse.snippets.select`

One option of a list kept in the cell's state, its options under Config.

The `select` snippet: a select cell, its value kept in the cell's state.

**Ops**

| Op | What |
| --- | --- |
| `set_value` | Set a select cell's value. A no-op when the cell is missing. |
| `value_of` | A select cell's value, `""` before one is set. Bare: wrap it in `ops.snapshot`. |

### Date

`date` · searchable · module `nuverse.snippets.date`

A date kept in the cell's state, picked from a calendar.

The `date` snippet: a date cell, its value kept in the cell's state.

**Ops**

| Op | What |
| --- | --- |
| `set_value` | Set a date cell's value. A no-op when the cell is missing. |
| `value_of` | A date cell's value, EMPTY before one is set. Bare: wrap it in `ops.snapshot`. |

## Code

| Name | What |
| --- | --- |
| [Program](#program) | A code cell that writes one key in its own state and ends. |

### Program

`program` · module `nuverse.snippets.program`

A code cell that writes one key in its own state and ends.

The `program` snippet: what a fresh code cell starts as.

## Debugging

| Name | What |
| --- | --- |
| [Lens](#lens) | Browses the whole space, or any shape in it, as cascading columns. |
| [Plane lens](#plane-lens) | Browses the plane the cell sits on as cascading columns. |
| [Cell lens](#cell-lens) | Browses one cell of this plane, picked from a dropdown. |

### Lens

`lens` · module `nuverse.snippets.lens`

Browses the whole space, or any shape in it, as cascading columns.

The `lens` snippet: a cell that browses a shape as cascading columns.

### Plane lens

`plane_lens` · module `nuverse.snippets.plane_lens`

Browses the plane the cell sits on as cascading columns.

The `plane_lens` snippet: a lens on the plane the cell sits on.

Built on the lens snippet's code, pointed at its own plane.

### Cell lens

`cell_lens` · module `nuverse.snippets.cell_lens`

Browses one cell of this plane, picked from a dropdown.

The `cell_lens` snippet: a lens on one cell of this plane, picked from a dropdown.

## Examples

| Name | What |
| --- | --- |
| [Ticker](#ticker) | A stat tile counting the seconds its plane was open. |
| [Password generator](#password-generator) | A strong password, drawn again whenever its length or characters change. |
| [Unit converter](#unit-converter) | Length, mass, temperature and time: type on either side, the other follows. |

### Ticker

`ticker` · module `nuverse.snippets.ticker`

A stat tile counting the seconds its plane was open.

The `ticker` snippet: a cell that draws and counts.

### Password generator

`password` · module `nuverse.snippets.password`

A strong password, drawn again whenever its length or characters change.

The `password` snippet: a password generator kept in the cell's state.

### Unit converter

`converter` · module `nuverse.snippets.converter`

Length, mass, temperature and time: type on either side, the other follows.

The `converter` snippet: a unit converter, either side editable.
