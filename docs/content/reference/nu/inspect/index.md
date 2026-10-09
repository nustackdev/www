---
title: inspect
description: "nu.inspect -- Nu describes itself, once, from the code."
---

Module `nu.inspect`.

nu.inspect -- Nu describes itself, once, from the code.

One extraction, three consumers: prompt building for an agent, the in-tree
`Inspect` atom for a running agent to explore with, and the docs site. The
text they share is written in exactly one place, the code, and read from
there.

Knowledge about any Nu thing comes from exactly two places, the code and the
docstring, and there is no third. So the docstring format has a definition
rather than a taste: it is the set of facts that are worth writing *because
they cannot be read*. Anything the code already states is derived. Absence of
a written section is not an error: it is empty data on the record, and the
consumer decides. Only lies about the code, or malformed sections, are
violations.


#### The Nu docstring format

A docstring has six parts, in this order. Each is written when there is
something true to put in it; every part is optional in the sense that its
absence is not flagged.

1. Summary. One line, one sentence, ending in a period. What the thing is,
   at a level someone who has never seen it can act on. Do not restate the
   signature: the call form is read off the code.

2. Description. One or more paragraphs saying how it works, as continuous
   prose. Write it when there is a mechanism the summary cannot carry.
   Filler here is worse than absence, because a reader takes it as
   meaningful.

   A discrete fact is not a description, it is a note. If a paragraph would
   survive being cut down to one bullet, it belongs in Notes.

3. Args. One line per argument, in order, named. Often the only place the
   real argument list is written down for an atom that inherits the variadic
   constructor. When present, it is checked against the code and a mismatch
   is a violation.

4. Notes. A bullet list of discrete facts, each standing on its own. Where
   things no signature can carry belong: what is bound where, what is lazy,
   what short-circuits, what an operator does not reach. A note is not a
   sentence of the description that got moved.

5. Yields. What evaluating the subject produces, including how it behaves on
   EMPTY and INVALID when that is not the plain rule. On an atom the return
   annotation is missing, so this is the only place the yield type lives. On
   a method the annotation carries the type; write Yields when there is
   meaning beyond the type - sentinel behaviour, promotion, edge conditions.
   If the whole content would repeat the annotation, skip it.

6. Example. One or more worked examples in doctest form, carrying the value
   each produces:

       >>> nu.run(nu.Int(10) - nu.Int(3))[0]
       7

   Multiple examples in one section separate with a blank line and parse as
   distinct records. Doctest form is what makes an example unable to lie, so
   use it whenever the subject can run without a live fabric. Something
   needing a context or a fabric may use a plain snippet with no expected
   value instead.

Written by hand: those six. Read off the code and never written: the name,
the kind, the sort, the cardinality, the call form, the defaults, the
module, and the source. If you find yourself typing something the code
already says, it belongs to the parser, not to you.

The rule cuts both ways, and Args is where it shows. An atom needs one
because the variadic constructor puts its arity nowhere else; a Shape or a
Service must not have one, because it is never called at all, and its slots
and methods are already exact on the class. A kind's own module states which
sections its subjects may write and which are violations.


#### The layout

- `core.docstring` reads what was written.
- `core.source` reads what the code says.
- `core.contract` says what a written fact may not lie about, and merges
  the two sources where a question needs both.
- `record` is the base every catalogue entry shares.
- `taxonomy` derives kind, sort, cardinality and abstractness, once, for
  every kind whose subject is a Nu term.
- `interaction`, `call` and `builder` specialize the record per kind.
- `module` is the same six-part format read off a module's own docstring,
  which is what a page or a prompt opens with.
- `shape` and `service` cover the two declarative kinds, which nu does
  not export: they are written by whoever wrote the app, so `parse_shape`
  is their entry point rather than a module catalogue, and `entry` is the
  one-lookup-at-a-time descent both of them share.

nu.inspect emits structured records and formats nothing. Printing a Nu tree as
a box-tree is the other direction and lives at `nu.lang.render`.

**Modules**

| Module | What |
| --- | --- |
| [`nu.inspect.core`](/docs/reference/nu/inspect/core) | Everything that is not specific to a kind. |

## interactions

Module `nu.inspect.interactions`.

Inspection atoms: the info records rendered as docs an agent can read.

[Full entries](/docs/reference/nu/inspect/interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Inspect](/docs/reference/nu/inspect/interactions#inspect) | `scalar_query` | `Inspect(path)` | Docs for a Nu module or subject, as formatted text. |
| [render](/docs/reference/nu/inspect/interactions#render) |  | `inspect.render(path)` | Resolve `path` and render whatever it points at, or empty on miss. |

## builder

Module `nu.inspect.builder`.

The builder kind: record, parse, verify.

[Full entries](/docs/reference/nu/inspect/builder)

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_builders](/docs/reference/nu/inspect/builder#catalogue_builders) | `inspect.catalogue_builders(module)` | A record per Form or Ref subclass the module exports, in export order. |
| [parse_builder](/docs/reference/nu/inspect/builder#parse_builder) | `inspect.parse_builder(cls, path='', aliases=())` | One BuilderRecord for `cls`. |
| [verify_builder](/docs/reference/nu/inspect/builder#verify_builder) | `inspect.verify_builder(cls)` | Every way `cls` and its methods lie about the format. |

## call

Module `nu.inspect.call`.

The call kind: record, parse, verify.

[Full entries](/docs/reference/nu/inspect/call)

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_calls](/docs/reference/nu/inspect/call#catalogue_calls) | `inspect.catalogue_calls(module)` | A CallRecord per free function the module exports, in export order. |
| [parse_call](/docs/reference/nu/inspect/call#parse_call) | `inspect.parse_call(target, name, path, owner, binding, qualifier='', aliases=())` | One CallRecord for `target`, however it was reached. |
| [verify_call](/docs/reference/nu/inspect/call#verify_call) | `inspect.verify_call(target, subject='')` | Every way `target`'s docstring lies about the format. |

## form

Module `nu.inspect.form`.

The form kind: record, parse, verify.

[Full entries](/docs/reference/nu/inspect/form)

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_forms](/docs/reference/nu/inspect/form#catalogue_forms) | `inspect.catalogue_forms(module)` | A FormRecord per Form subclass the module exports, in export order. |
| [parse_form](/docs/reference/nu/inspect/form#parse_form) | `inspect.parse_form(cls, path='', aliases=())` | One FormRecord for `cls`. |
| [verify_form](/docs/reference/nu/inspect/form#verify_form) | `inspect.verify_form(cls)` | Every way `cls` lies about the format. No form-specific laws yet. |

## interaction

Module `nu.inspect.interaction`.

The interaction kind: record, parse, verify.

[Full entries](/docs/reference/nu/inspect/interaction)

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_interactions](/docs/reference/nu/inspect/interaction#catalogue_interactions) | `inspect.catalogue_interactions(module)` | A record per interaction the module exports, in export order. |
| [parse_interaction](/docs/reference/nu/inspect/interaction#parse_interaction) | `inspect.parse_interaction(atom, path='', aliases=())` | One InteractionRecord for `atom`. |
| [verify_interaction](/docs/reference/nu/inspect/interaction#verify_interaction) | `inspect.verify_interaction(atom)` | Every way `atom`'s docstring lies about the code. |

## ref

Module `nu.inspect.ref`.

The ref kind: record, parse, verify.

[Full entries](/docs/reference/nu/inspect/ref)

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_refs](/docs/reference/nu/inspect/ref#catalogue_refs) | `inspect.catalogue_refs(module)` | A RefRecord per Ref subclass the module exports, in export order. |
| [parse_ref](/docs/reference/nu/inspect/ref#parse_ref) | `inspect.parse_ref(cls, path='', aliases=())` | One RefRecord for `cls`. |
| [verify_ref](/docs/reference/nu/inspect/ref#verify_ref) | `inspect.verify_ref(cls)` | Every way `cls` lies about the format. No ref-specific laws yet. |

## service

Module `nu.inspect.service`.

The service kind: record, parse, verify.

[Full entries](/docs/reference/nu/inspect/service)

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_services](/docs/reference/nu/inspect/service#catalogue_services) | `inspect.catalogue_services(module)` | A ServiceRecord per Service the module declares, in export order. |
| [parse_service](/docs/reference/nu/inspect/service#parse_service) | `inspect.parse_service(cls, path='', aliases=())` | One ServiceRecord for `cls`. Methods are listed, not expanded. |
| [verify_service](/docs/reference/nu/inspect/service#verify_service) | `inspect.verify_service(cls)` | Every way `cls` lies about the format. Same two removals as a Shape. |

## shape

Module `nu.inspect.shape`.

The shape kind: record, parse, verify.

[Full entries](/docs/reference/nu/inspect/shape)

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_shapes](/docs/reference/nu/inspect/shape#catalogue_shapes) | `inspect.catalogue_shapes(module)` | A ShapeRecord per Shape the module declares, in export order. |
| [parse_shape](/docs/reference/nu/inspect/shape#parse_shape) | `inspect.parse_shape(cls, path='', aliases=())` | One ShapeRecord for `cls`. Slots are listed, not expanded. |
| [verify_shape](/docs/reference/nu/inspect/shape#verify_shape) | `inspect.verify_shape(cls)` | Every way `cls` lies about the format. |

## entry

Module `nu.inspect.entry`.

Entries: what a declared class holds, and the record behind one of them.

[Full entries](/docs/reference/nu/inspect/entry)

| Name | Call | Meaning |
| --- | --- | --- |
| [entries_of](/docs/reference/nu/inspect/entry#entries_of) | `inspect.entries_of(cls, path)` | One Entry per member `cls` declares. |
| [parse_entry](/docs/reference/nu/inspect/entry#parse_entry) | `inspect.parse_entry(cls, name, path='')` | The record for one entry of `cls`, or None when it declares no such name. |

## module

Module `nu.inspect.module`.

The module kind: record and parse.

[Full entries](/docs/reference/nu/inspect/module)

| Name | Call | Meaning |
| --- | --- | --- |
| [parse_module](/docs/reference/nu/inspect/module#parse_module) | `inspect.parse_module(module, path='')` | One ModuleRecord for `module`. |
