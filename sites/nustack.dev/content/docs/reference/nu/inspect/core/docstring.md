---
title: docstring
description: "What was written: a docstring, parsed."
---

Module `nu.inspect.core.docstring`.

What was written: a docstring, parsed.

One module per thing a docstring holds, each with its parser and the value
that parser produces. Generic Google-style parsing throughout: which sections
matter and which are required is the contract's business, not this layer's.

- `blocks` splits a docstring into summary, description and named sections.
  Summary and description come out of the split because they are defined by
  position, so they have no readers of their own.
- `args` parses an Args section into one entry per argument.
- `notes` parses a Notes section into one string per bullet.
- `example` parses an Example section into code and its expected value.

A Yields section is free text, so it needs no reader: it is read straight off
the blocks.

## args

Module `nu.inspect.core.docstring.args`.

The arguments a docstring documents.

What was written, and only that. Merging this with what the signature says is
a different question and belongs to the contract, not here.

| Name | Call | Meaning |
| --- | --- | --- |
| [parse_args](#parse_args) | `docstring.parse_args(text)` | Parse an Args section into one entry per argument, in order. |

### parse_args

Parse an Args section into one entry per argument, in order.

```python
docstring.parse_args(text)
```

Path `nu.inspect.core.docstring.parse_args`. Defined on `nu.inspect.core.docstring.args`, bound as a function. Builds `tuple[DocArg, ...]`.

Continuation lines are folded into the argument above them, so a long
description wraps without becoming a second argument.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `str` |  | the section body, already dedented. |

Undocumented: example.

## example

Module `nu.inspect.core.docstring.example`.

Example parsing: an example section in, code and expected output out.

Two forms are accepted. Doctest form carries the value the example produces,
so it can be executed and cannot lie about what it does:

```python
>>> nu.run(nu.Int(10) - nu.Int(3))
7
```

Plain form is a snippet with no expected value, for an atom that needs a live
fabric or context to run at all:

```python
nu.Print(nu.Str("hi"))
```

Which one an example uses is recorded rather than judged. Whether a plain
example is acceptable for a given atom is a Nu question, so it belongs to the
per-kind validator upstairs, not here.

| Name | Call | Meaning |
| --- | --- | --- |
| [parse_example](#parse_example) | `docstring.parse_example(text)` | Split an example section into its code and its expected output. |
| [parse_examples](#parse_examples) | `docstring.parse_examples(text)` | Split an Example section into one Example per blank-line-separated chunk. |

### parse_example

Split an example section into its code and its expected output.

```python
docstring.parse_example(text)
```

Path `nu.inspect.core.docstring.parse_example`. Defined on `nu.inspect.core.docstring.example`, bound as a function. Builds `Example`.

Lines prefixed `>>>` or `...` are code and everything between them is
expected output. A section with no prompt anywhere is taken whole as code
with no expected output.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `str` |  | the section body, already dedented. |

Undocumented: example.

### parse_examples

Split an Example section into one Example per blank-line-separated chunk.

```python
docstring.parse_examples(text)
```

Path `nu.inspect.core.docstring.parse_examples`. Defined on `nu.inspect.core.docstring.example`, bound as a function. Builds `tuple[Example, ...]`.

An Example section can carry more than one worked example, one after the
other, separated by blank lines. Each chunk parses through
`parse_example`, so both doctest and plain forms are recognised
per chunk. Chunks that are all whitespace or that parse empty are
dropped.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `str` |  | the section body, already dedented. |

Undocumented: example.

## notes

Module `nu.inspect.core.docstring.notes`.

The bullets a Notes section holds, one discrete fact each.

| Name | Call | Meaning |
| --- | --- | --- |
| [parse_notes](#parse_notes) | `docstring.parse_notes(text)` | Split a Notes section into one string per bullet. |

### parse_notes

Split a Notes section into one string per bullet.

```python
docstring.parse_notes(text)
```

Path `nu.inspect.core.docstring.parse_notes`. Defined on `nu.inspect.core.docstring.notes`, bound as a function. Builds `tuple[str, ...]`.

Continuation lines fold into the bullet above them. Content with no bullet
marker at all comes back as a single entry, so a prose Notes section is
not silently dropped.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `str` |  | the section body, already dedented. |

Undocumented: example.

## blocks

Module `nu.inspect.core.docstring.blocks`.

Split a docstring into its blocks. The step every other reader starts from.

A docstring is a summary line, a description, and named sections. Splitting it
is generic Google-style parsing and knows nothing about which sections matter,
which is the contract's business.

Summary and description come out of the split itself rather than from their
own readers, because they are defined by position: the first line, and
everything before the first section header.

| Name | Call | Meaning |
| --- | --- | --- |
| [split_docstring](#split_docstring) | `docstring.split_docstring(text)` | Split `text` into summary, description and sections. |

### split_docstring

Split `text` into summary, description and sections.

```python
docstring.split_docstring(text)
```

Path `nu.inspect.core.docstring.split_docstring`. Defined on `nu.inspect.core.docstring.blocks`, bound as a function. Builds `Blocks`.

An empty or missing docstring splits to empty Blocks rather than raising,
so a caller can treat absence as data.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `str \| None` |  | the raw docstring, or None. |

Undocumented: example.
