"""The extensions a space finds, as catalogue pages.

An extension has no API worth a module walk: its surface is what the ``+``
and ``/`` menus offer. So it is read off the ``nuspace.extensions`` entry
points, the same registry nuspace reads, and each one becomes a reference
folder with three pages: a landing page, its planes and its snippets, both
grouped under the headings the menus show.

Every fact comes off a spec or a docstring. The one-liner is what the picker
shows, the prose under it is the docstring of the module that documents the
spec. Where a module has none the entry stops at the one-liner.
"""

from __future__ import annotations

import importlib
import pkgutil
import re
from importlib.metadata import entry_points
from types import ModuleType
from typing import Any

from .pages import EXTENSIONS, Ext
from .prose import cell, text

__all__ = ["files"]

_NON_WORD = re.compile(r"[^a-z0-9]+")


def files() -> dict[str, str]:
    """Every file the extension pages write, keyed by repo-relative path."""
    found = {ep.name: ep for ep in entry_points(group="nuspace.extensions")}
    out: dict[str, str] = {}
    for spec in EXTENSIONS:
        ep = found.get(spec.name)
        if ep is None:
            raise RuntimeError(f"no nuspace.extensions entry point named {spec.name}; install it")
        package = importlib.import_module(ep.value.partition(":")[0])
        extension = ep.load()()
        homes = _homes(package)
        out[f"{spec.ref}/index.md"] = _index(spec, package, extension)
        out[f"{spec.ref}/planes.md"] = _catalogue(
            "Planes",
            "What `+` creates. Grouped as the picker groups them.",
            extension.planes,
            homes,
            _plane_facts,
        )
        out[f"{spec.ref}/snippets.md"] = _catalogue(
            "Snippets",
            "What `/` inserts. Grouped as the menu groups them.",
            extension.snippets,
            homes,
            _snippet_facts,
        )
    return out


# --- pages ----------------------------------------------------------------


def _index(spec: Ext, package: ModuleType, extension: Any) -> str:
    lines = _frontmatter(spec.title, _summary(package.__doc__ or ""))
    lines += [f"Package `{package.__name__}`.", ""]
    lines += [text(package.__doc__ or ""), ""]
    rows = [
        (f"[Planes]({spec.url}/planes)", str(len(extension.planes)), "What `+` creates."),
        (f"[Snippets]({spec.url}/snippets)", str(len(extension.snippets)), "What `/` inserts."),
    ]
    lines += _table(("Page", "Count", "What"), rows)
    return _join(lines)


def _catalogue(title: str, lead: str, specs: tuple[Any, ...], homes: dict[int, str], facts) -> str:
    lines = _frontmatter(title, lead.replace("`", ""))
    lines += [lead, ""]
    for group, members in _grouped(specs):
        lines += [f"## {group or 'Other'}", ""]
        rows = [(f"[{s.label}](#{_slug(s.label)})", cell(s.description)) for s in members]
        lines += _table(("Name", "What"), rows)
        lines.append("")
        for spec in members:
            lines += _entry(spec, homes.get(id(spec), ""), facts)
    return _join(lines)


def _entry(spec: Any, home: str, facts) -> list[str]:
    lines = [f"### {spec.label}", ""]
    lines += [" · ".join(facts(spec) + ([f"module `{home}`"] if home else [])), ""]
    if spec.description:
        lines += [spec.description, ""]
    module = importlib.import_module(home) if home else None
    if module is not None and module.__doc__:
        lines += [_demote(text(module.__doc__)), ""]
    ops = getattr(spec, "ops", ())
    if ops:
        rows = [(f"`{op.__name__}`", cell(_summary(op.__doc__ or ""))) for op in ops]
        lines += ["**Ops**", "", *_table(("Op", "What"), rows), ""]
    return lines


def _plane_facts(spec: Any) -> list[str]:
    out = [f"`{spec.name}`", f"backend `{spec.backend}`"]
    if spec.cells:
        out.append("cells " + ", ".join(f"`{name}`" for name, _ in spec.cells))
    if spec.children:
        out.append("seeds " + ", ".join(f"`{c.name}`" for c in spec.children))
    return out


def _snippet_facts(spec: Any) -> list[str]:
    out = [f"`{spec.name}`"]
    if spec.search is not None:
        out.append("searchable")
    return out


# --- lookups --------------------------------------------------------------


def _homes(package: ModuleType) -> dict[int, str]:
    """Each spec object to the module that documents it.

    A spec is defined in a module of its own and may be re-exported up the
    tree. Its home is the deepest module holding it, climbed while the parent
    package re-exports it too: a snippet's ``ext.py`` defines it, and the
    snippet package over it re-exports it and carries the docstring. The
    extension's own package is never a home, it holds every spec.
    """
    modules = {package.__name__: package}
    for info in pkgutil.walk_packages(package.__path__, f"{package.__name__}."):
        modules[info.name] = importlib.import_module(info.name)
    held: dict[int, list[str]] = {}
    for name, module in modules.items():
        for value in vars(module).values():
            if hasattr(value, "label") and hasattr(value, "name"):
                held.setdefault(id(value), []).append(name)
    out: dict[int, str] = {}
    for key, names in held.items():
        home = max(names, key=lambda n: n.count("."))
        while True:
            parent = home.rpartition(".")[0]
            if parent == package.__name__ or parent not in names:
                break
            home = parent
        out[key] = home
    return out


def _grouped(specs: tuple[Any, ...]) -> list[tuple[str, list[Any]]]:
    """Groups in the order their first member registers, the ungrouped last."""
    groups: dict[str, list[Any]] = {}
    for spec in specs:
        groups.setdefault(spec.group, []).append(spec)
    ungrouped = groups.pop("", [])
    return list(groups.items()) + ([("", ungrouped)] if ungrouped else [])


# --- markdown -------------------------------------------------------------


def _frontmatter(title: str, description: str) -> list[str]:
    safe = description.replace('"', '\\"')
    return ["---", f"title: {title}", f'description: "{safe}"', "---", ""]


def _summary(doc: str) -> str:
    return " ".join(doc.strip().split("\n\n")[0].split())


def _demote(body: str) -> str:
    """Docstring headings sit under an entry's ``###``."""
    return re.sub(r"^#{1,4} ", "#### ", body, flags=re.MULTILINE)


def _slug(label: str) -> str:
    return _NON_WORD.sub("-", label.lower()).strip("-")


def _table(headers: tuple[str, ...], rows: list[tuple[str, ...]]) -> list[str]:
    return [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
        *["| " + " | ".join(r) + " |" for r in rows],
    ]


def _join(lines: list[str]) -> str:
    out: list[str] = []
    for line in lines:
        if line == "" and out and out[-1] == "":
            continue
        out.append(line)
    return "\n".join(out).strip() + "\n"
