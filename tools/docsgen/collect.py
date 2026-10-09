"""Node in, Page out. Every fact comes off a nu.inspect record."""

from __future__ import annotations

import importlib
import sys
from typing import Any

from nu.inspect import BuilderRecord, InteractionRecord, parse_module

from .discover import Node
from .model import Child, Page, Root, Section, label, slug
from .pages import RootSpec

__all__ = ["build", "build_root"]


def build(node: Node) -> Page:
    """One discovered node as a page: its prose, its sections, its nested pages."""
    module = importlib.import_module(node.module)
    return Page(
        base=node.base,
        module=node.module,
        record=parse_module(module, path=node.module),
        sections=_sections(node.records, node.module, _reserved(node)),
        children=tuple(_child(c) for c in node.children),
    )


def build_root(spec: RootSpec, nodes: tuple[Node, ...]) -> Root:
    """A distribution landing page: the table of what is in the box."""
    return Root(path=spec.path, title=spec.title, children=tuple(_child(n) for n in nodes))


def _reserved(node: Node) -> set[str]:
    """The names the nested pages already occupy in this page's directory.

    A page nested under a section sits at its mirrored path, so what it takes
    from the parent's directory is the section's name, not its own:
    ``nu.forms.collections.abc`` claims ``collections/``.
    """
    return {c.base.removeprefix(f"{node.base}/").split("/")[0] for c in node.children}


def _child(node: Node) -> Child:
    record = parse_module(importlib.import_module(node.module), path=node.module)
    return Child(module=node.module, url=node.url, record=record)


def _sections(records: tuple[Any, ...], under: str, reserved: set[str]) -> tuple[Section, ...]:
    """Group by defining submodule, or by kind when there is no split."""
    modules = _ordered({r.module for r in records}, records, key=lambda r: r.module)
    if len(modules) > 1:
        grouped = [
            Section(
                title=name,
                record=_module_record(name),
                subjects=tuple(r for r in records if r.module == name),
            )
            for name in modules
        ]
    else:
        kinds = _ordered({_kind(r) for r in records}, records, key=_kind)
        grouped = [
            Section(title=name, record=None, subjects=tuple(r for r in records if _kind(r) == name))
            for name in kinds
        ]
    return _named(grouped, under, reserved)


def _named(sections: list[Section], under: str, reserved: set[str]) -> tuple[Section, ...]:
    """Give each section its heading and its filename, avoiding every collision.

    ``reserved`` holds the names the nested pages already took. A section file
    and a nested page folder live side by side in the same directory, so a
    section yields the name: a nested page's slug is its module's own, and a
    fabric URL depends on it.
    """
    out: list[Section] = []
    seen: dict[str, int] = dict.fromkeys(reserved, 1)
    for section in sections:
        short = label(section.title, under)
        base = slug(short) or "section"
        count = seen.get(base, 0)
        seen[base] = count + 1
        out.append(
            Section(
                title=section.title,
                record=section.record,
                subjects=section.subjects,
                label=short,
                slug=base if count == 0 else f"{base}-{count}",
            )
        )
    return tuple(out)


def _ordered(names: set[str], records: tuple[Any, ...], key: Any) -> list[str]:
    """``names`` sorted by where each first appears in export order."""
    order = {}
    for record in records:
        order.setdefault(key(record), len(order))
    return sorted(names, key=lambda n: order[n])


def _kind(record: Any) -> str:
    """The grouping label when a page has no submodule split."""
    if isinstance(record, InteractionRecord | BuilderRecord):
        return record.kind or type(record).__name__
    return type(record).__name__.removesuffix("Record")


def _module_record(dotted: str) -> Any | None:
    """The submodule's own record, or None when it is not importable."""
    module = sys.modules.get(dotted)
    if module is None:
        try:
            module = importlib.import_module(dotted)
        except ImportError:
            return None
    return parse_module(module, path=dotted)
