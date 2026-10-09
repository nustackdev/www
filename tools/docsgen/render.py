"""Page in, markdown out.

Plain markdown, no MDX components: these files are also what ``llms.txt`` and
``content.md`` serve, so they have to read as raw text.

The renderer copies fields. Where a record is thin the page says so and stops.
Nothing here writes prose to cover a gap: a gap is a docstring to fix in nu.

A page renders as one file, or as a folder: an index carrying the module prose
and one summary table per section, plus one file per section holding the full
entries. It becomes a folder past ``SPLIT`` lines, or as soon as another page
is nested under it. The URL is the same either way.

A label says the last segment only, because the ancestry is already in the URL.
The full dotted path is never far: the page states its module under the title,
a section states its own under its heading, and every subject carries its path
in the metadata strip.
"""

from __future__ import annotations

import re
from typing import Any

from nu.inspect import BuilderRecord, CallRecord, InteractionRecord
from nu.inspect.core.contract import call_form, render_args

from .model import Page, Root, Section
from .pages import SPLIT
from .prose import cell, text

__all__ = ["files", "root"]

_SUBJECT_TABLE = ("Name", "Sort", "Call", "Meaning")
_ARG_TABLE = ("Name", "Type", "Default", "Meaning")
_METHOD_TABLE = ("Call", "Builds", "Meaning")
_ENTRY_TABLE = ("Name", "Kind", "Type", "Config", "Path")
_CHILD_TABLE = ("Module", "What")


def files(built: Page) -> dict[str, str]:
    """Every file this page writes, keyed by repo-relative path."""
    single = _single(built)
    long = len(built.sections) > 1 and len(single.splitlines()) > SPLIT
    if built.children or long:
        return _folder(built)
    return {f"{built.base}.md": single}


def root(built: Root) -> str:
    """A distribution landing page: the table of the modules it ships."""
    lines = ["---", f"title: {built.title}", "---", ""]
    lines += _children(built.children)
    return _join(lines)


# --- the two page shapes --------------------------------------------------


def _single(built: Page) -> str:
    """One file: module prose, then every section inline."""
    _load(built.sections, headed=True)
    lines = _head(built)
    for section in built.sections:
        lines += _heading(section)
        if section.record is not None:
            lines += _prose(section.record)
        lines += _summary(section.subjects, "")
        for subject in section.subjects:
            lines += _subject(subject, depth=1)
    return _join(lines)


def _folder(built: Page) -> dict[str, str]:
    """A folder: an index of summary tables, and one file per section."""
    out = {f"{built.base}/index.md": _folder_index(built)}
    for section in built.sections:
        out[f"{built.base}/{section.slug}.md"] = _section_file(section)
    return out


def _folder_index(built: Page) -> str:
    lines = _head(built)
    for section in built.sections:
        target = f"{built.url}/{section.slug}"
        lines += _heading(section)
        if section.record is not None and section.record.summary:
            lines += [text(section.record.summary), ""]
        lines += [f"[Full entries]({target})", ""]
        _load((section,), headed=False)
        lines += _summary(section.subjects, target)
    return _join(lines)


def _section_file(section: Section) -> str:
    _load((section,), headed=False)
    summary = section.record.summary if section.record is not None else ""
    lines = _frontmatter_block(section.label, summary)
    lines += _module_line(section.module)
    if section.record is not None:
        lines += _prose(section.record)
    lines += _summary(section.subjects, "")
    for subject in section.subjects:
        lines += _subject(subject, depth=0)
    return _join(lines)


def _head(built: Page) -> list[str]:
    """Title, the dotted module the title is short for, prose, and what is nested."""
    lines = _frontmatter_block(built.label, built.record.summary)
    lines += _module_line(built.module)
    lines += _prose(built.record)
    if built.children:
        lines += ["", "**Modules**", ""]
        lines += _children(built.children)
    return lines


def _heading(section: Section) -> list[str]:
    """A section heading: the short label, with the dotted path under it."""
    return ["", f"## {section.label}", "", *_module_line(section.module)]


def _module_line(dotted: str) -> list[str]:
    """The one place the full dotted path is stated, since the labels dropped it."""
    if not dotted:
        return []
    return [f"Module `{dotted}`.", ""]


def _children(children: tuple[Any, ...]) -> list[str]:
    rows = [(f"[`{c.module}`]({c.url})", cell(c.record.summary)) for c in children]
    return [*_table(_CHILD_TABLE, rows), ""]


def _frontmatter_block(title: str, summary: str) -> list[str]:
    lines = ["---", f"title: {title}"]
    if summary:
        lines.append(f'description: "{_frontmatter(summary)}"')
    return [*lines, "---", ""]


def _join(lines: list[str]) -> str:
    return "\n".join(_squeeze(lines)).rstrip() + "\n"


# --- sections -------------------------------------------------------------


def _summary(subjects: tuple[Any, ...], target: str) -> list[str]:
    """The summary table that opens a section. ``target`` is "" for a same-file link.

    Sort is dropped when nothing in the section has one. A free function carries
    no taxonomy, so a whole std section would otherwise print an empty column.
    """
    sorts = any(getattr(s, "sort", "") for s in subjects)
    headers = _SUBJECT_TABLE if sorts else tuple(h for h in _SUBJECT_TABLE if h != "Sort")
    rows = []
    for s in subjects:
        row = [f"[{s.name}]({target}#{_anchor(s)})"]
        if sorts:
            row.append(_code(getattr(s, "sort", "")))
        row += [_code(_call(s)), cell(s.summary)]
        rows.append(tuple(row))
    return ["", *_table(headers, rows), ""]


# --- one subject ----------------------------------------------------------


def _subject(record: Any, depth: int) -> list[str]:
    lines = ["", f"{'#' * (depth + 2)} {record.name}", ""]
    if record.summary:
        lines += [text(record.summary), ""]
    call = _call(record)
    if call:
        lines += ["```python", call, "```", ""]
    lines += [_facts(record), ""]
    if record.description:
        lines += [text(record.description), ""]
    lines += _args(getattr(record, "args", ()))
    lines += _labelled("Yields", getattr(record, "yields", ""))
    lines += _notes(record.notes)
    lines += _examples(record.examples)
    lines += _entries(getattr(record, "entries", ()))
    lines += _methods(record, depth)
    lines += _absent(record)
    return lines


def _facts(record: Any) -> str:
    """The one-line metadata strip. Every part is a field on the record."""
    parts = [f"Path `{record.path}`."]
    if record.aliases:
        parts.append("Also exported as " + ", ".join(f"`{a}`" for a in record.aliases) + ".")
    taxonomy = [
        ("Kind", getattr(record, "kind", "")),
        ("Sort", getattr(record, "sort", "")),
        ("Cardinality", getattr(record, "cardinality", "")),
    ]
    named = [f"{label.lower()} `{value}`" for label, value in taxonomy if value]
    if named:
        parts.append(_sentence(named))
    if getattr(record, "abstract", False):
        parts.append("Abstract: a taxonomy base, not an atom you build.")
    if isinstance(record, InteractionRecord) and record.args:
        parts.append(f"Arity {record.arity} ({record.required} required).")
    if isinstance(record, CallRecord):
        parts.append(f"Defined on `{record.owner}`, bound as a {record.binding}.")
        if record.returns:
            parts.append(f"Builds `{record.returns}`.")
    return " ".join(parts)


def _sentence(named: list[str]) -> str:
    head = named[0][0].upper() + named[0][1:]
    return ", ".join([head, *named[1:]]) + "."


def _args(args: tuple[Any, ...]) -> list[str]:
    if not args:
        return []
    rows = [
        (
            _code(("*" if a.variadic else "") + a.name),
            _code(a.annotation),
            _code(a.default) if a.has_default else "",
            cell(a.text),
        )
        for a in args
    ]
    return ["**Arguments**", "", *_table(_ARG_TABLE, rows), ""]


def _entries(entries: tuple[Any, ...]) -> list[str]:
    if not entries:
        return []
    rows = [
        (_code(e.name), _code(e.kind), _code(e.type), _code(e.config), _code(e.path))
        for e in entries
    ]
    return ["**Slots**", "", *_table(_ENTRY_TABLE, rows), ""]


def _methods(record: Any, depth: int) -> list[str]:
    """Own methods in full, inherited ones as a table under their definer.

    The mixin classes that define most of an inherited surface are exported by
    no module, so there is no page to link the owner to. The owner is still
    named: where a method comes from is the whole point of the grouping.
    """
    if not isinstance(record, BuilderRecord) or not record.methods:
        return []
    own = f"{record.module}.{record.name}"
    lines: list[str] = []
    declared = [m for m in record.methods if m.owner == own]
    if declared:
        lines += ["**Methods**", ""]
        for method in declared:
            lines += _method(method, depth)
    inherited = [m for m in record.methods if m.owner != own]
    if inherited:
        lines += ["**Inherited methods**", ""]
        for owner in _owners(inherited):
            rows = [
                (_code(m.call), _code(m.returns), cell(m.summary))
                for m in inherited
                if m.owner == owner
            ]
            lines += [f"From `{owner}`:", "", *_table(_METHOD_TABLE, rows), ""]
    return lines


def _method(record: CallRecord, depth: int) -> list[str]:
    # Backticked: a call form carries `<UNSET>` defaults, and a bare heading
    # feeds those to the markdown parser as raw HTML, which the MDX pipeline
    # rejects. The slug is unchanged, code span or not.
    lines = [f"{'#' * (depth + 3)} `{record.call}`", ""]
    if record.summary:
        lines += [text(record.summary), ""]
    if record.returns:
        lines += [f"Builds `{record.returns}`.", ""]
    if record.description:
        lines += [text(record.description), ""]
    lines += _args(record.args)
    lines += _labelled("Yields", record.yields)
    lines += _notes(record.notes)
    lines += _examples(record.examples)
    lines += _absent(record)
    return lines


def _owners(methods: list[CallRecord]) -> list[str]:
    order: dict[str, None] = {}
    for method in methods:
        order.setdefault(method.owner, None)
    return list(order)


# --- shared blocks --------------------------------------------------------


def _prose(record: Any) -> list[str]:
    """Summary, description, notes and examples off any record."""
    lines: list[str] = []
    if record.summary:
        lines += [text(record.summary), ""]
    if record.description:
        lines += [text(record.description), ""]
    lines += _notes(record.notes)
    lines += _examples(record.examples)
    return lines


def _notes(notes: tuple[str, ...]) -> list[str]:
    if not notes:
        return []
    return ["**Notes**", "", *[f"- {text(n)}" for n in notes], ""]


def _examples(examples: tuple[Any, ...]) -> list[str]:
    if not examples:
        return []
    label = "**Example**" if len(examples) == 1 else "**Examples**"
    lines = [label, ""]
    for example in examples:
        lines += ["```python", example.code, "```", ""]
        if example.expected:
            lines += ["```", example.expected, "```", ""]
    return lines


def _labelled(label: str, body: str) -> list[str]:
    if not body.strip():
        return []
    return [f"**{label}**", "", text(body), ""]


def _absent(record: Any) -> list[str]:
    """Name what the docstring does not carry, so a thin entry reads as unfinished."""
    missing = []
    if not record.summary:
        missing.append("summary")
    # No "arguments" check: an empty arg tuple is a nullary atom as often as it
    # is a gap, and the two are not told apart from here. verify_interaction
    # already catches an Args section that disagrees with the code.
    if isinstance(record, InteractionRecord | CallRecord):
        if not record.yields and not getattr(record, "returns", ""):
            missing.append("yields")
    if not record.examples:
        missing.append("example")
    if not missing:
        return []
    return [f"Undocumented: {', '.join(missing)}.", ""]


# --- primitives -----------------------------------------------------------


def _call(record: Any) -> str:
    """The call form, off the record where there is one, off the same formatter where not."""
    if hasattr(record, "call"):
        return str(record.call)
    if isinstance(record, BuilderRecord):
        return render_args(record.name, call_form(record.target, record.blocks()))
    return ""


def _table(headers: tuple[str, ...], rows: list[tuple[str, ...]]) -> list[str]:
    return [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
        *["| " + " | ".join(r) + " |" for r in rows],
    ]


def _code(value: str) -> str:
    """A code span for a table cell. A type union carries a pipe; escape it."""
    return f"`{value.replace('|', chr(92) + '|')}`" if value else ""


_ANCHORS: dict[str, str] = {}
_PUNCTUATION = re.compile(r"[^\w\- ]", re.UNICODE)


def _load(sections: tuple[Section, ...], headed: bool) -> None:
    """Compute every heading's anchor for one file, in document order.

    `nu.core` exports both `Print` and `print`, so subject names collide once
    lowercased. Fumadocs slugs headings with github-slugger, which suffixes a
    repeat with `-1`. The index links have to agree with it, which means
    walking the headings in the order they will be written. A folder's section
    files each get their own namespace, so this runs once per file.

    ``headed`` is True when the section titles are themselves headings in the
    file, which they are on a single-file page and are not in a section file.
    """
    seen: dict[str, int] = {}
    _ANCHORS.clear()

    def take(heading: str) -> str:
        base = _PUNCTUATION.sub("", heading.strip().lower()).replace(" ", "-")
        count = seen.get(base, 0)
        seen[base] = count + 1
        return base if count == 0 else f"{base}-{count}"

    for section in sections:
        if headed:
            take(section.label)
        for subject in section.subjects:
            _ANCHORS[subject.path] = take(subject.name)
            if isinstance(subject, BuilderRecord):
                own = f"{subject.module}.{subject.name}"
                for method in subject.methods:
                    if method.owner == own:
                        take(method.call)


def _anchor(record: Any) -> str:
    return _ANCHORS.get(record.path, "")


def _frontmatter(summary: str) -> str:
    flat = " ".join(cell(summary).split())
    return flat.replace('"', "'")


def _squeeze(lines: list[str]) -> list[str]:
    out: list[str] = []
    for line in lines:
        if not line.strip() and out and not out[-1].strip():
            continue
        out.append(line.rstrip())
    return out
