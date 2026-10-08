"""Which modules exist, and which of them is a page.

Nothing here is a list of modules. The two installed distributions are walked,
and the tree that comes out is the module tree, so a module nobody thought to
list still gets documented.

Two derived rules decide the shape:

**A subpackage its parent re-exports is a section of the parent's page. A
subpackage the parent does not re-export is its own page, nested under it.**
Re-export is read off the catalogues: when a subject the parent exports is
*defined* in the subpackage, the parent is publishing that subpackage's surface
and the subpackage is part of the parent's page. ``nu.core`` re-exports
``nu.core.arithmetic``, so arithmetic is a section. It does not re-export
``nu.core.flows``, so flows is a page at ``nu/core/flows``.

**A package with no subjects of its own and no page-worthy descendant is not a
page.** There is nothing on it to document. A package with no subjects but with
descendants that have some becomes a folder landing page: its docstring over a
table of what is under it. That is what ``nu.domains``, ``nu.std`` and
``nu.inspect.core`` are.

Below the distribution directory the docs path mirrors the module path, so
``nu.core.flows`` is ``reference/nu/core/flows`` and ``nu.std.math`` is
``reference/nustd/std/math``. The ten fabric slugs fall out of that on their
own, and :func:`check_fabrics` asserts it rather than trusting it.
"""

from __future__ import annotations

import importlib
import json
import sys
from dataclasses import dataclass, field
from importlib import metadata
from pathlib import Path
from types import ModuleType
from typing import Any

from nu.inspect import (
    catalogue_calls,
    catalogue_forms,
    catalogue_interactions,
    catalogue_refs,
    catalogue_services,
    catalogue_shapes,
)

from .pages import DISTRIBUTIONS, FABRICS, REF, SKIP

__all__ = ["Node", "check_fabrics", "discover", "roots"]

_CATALOGUES = (
    catalogue_interactions,
    catalogue_forms,
    catalogue_refs,
    catalogue_shapes,
    catalogue_services,
    catalogue_calls,
)


@dataclass(frozen=True)
class Node:
    """One page: its module, where it is written, and the pages nested under it."""

    module: str
    base: str
    records: tuple[Any, ...] = ()
    children: tuple[Node, ...] = field(default_factory=tuple)

    @property
    def label(self) -> str:
        """The sidebar label. The last segment only; the path carries the rest."""
        return self.module.rsplit(".", 1)[-1]

    @property
    def url(self) -> str:
        return "/" + self.base.removeprefix("content/")

    def walk(self) -> list[Node]:
        out = [self]
        for child in self.children:
            out += child.walk()
        return out


def discover() -> tuple[tuple[str, tuple[Node, ...]], ...]:
    """Every page, grouped by the distribution directory it lands in."""
    out = []
    for dist, folder in DISTRIBUTIONS:
        tops: list[Node] = []
        for root in roots(dist, folder):
            for dotted in _packages_in(root, folder):
                node = _node(dotted, f"{REF}/{folder}/{_tail(dotted)}")
                if node is not None:
                    tops.append(node)
        out.append((folder, tuple(sorted(tops, key=lambda n: n.module))))
    return tuple(out)


def roots(dist: str, pkg: str) -> list[Path]:
    """The ``pkg/`` directories one distribution contributes to the namespace.

    Since 0.5.0 each distribution owns its own import root: ``nucore`` ships
    ``nu``, ``nustd`` ships ``nustd``. The root is passed in rather than
    assumed, so neither is the one the walk is hardcoded to.

    A wheel install lists them in its own RECORD. An editable install lists
    nothing under ``pkg/``, so its project directory is read off
    ``direct_url.json`` and matched against the namespace path.
    """
    portions = [Path(p).resolve() for p in importlib.import_module(pkg).__path__]
    installed = metadata.distribution(dist)
    if any(f.parts[:1] == (pkg,) and len(f.parts) > 1 for f in installed.files or ()):
        return [p for p in portions if p == Path(installed.locate_file(pkg)).resolve()]
    origin = installed.read_text("direct_url.json")
    if origin is None:
        raise RuntimeError(f"cannot locate the {dist} sources")
    project = Path(json.loads(origin)["url"].removeprefix("file://")).resolve()
    return [p for p in portions if project in p.parents]


def check_fabrics(nodes: tuple[Node, ...]) -> None:
    """Refuse to generate if a fabric page stopped living at its fixed URL."""
    by_module = {n.module: n for n in nodes}
    for slug in FABRICS:
        node = by_module.get(f"nustd.{slug}")
        if node is None:
            raise RuntimeError(f"fabric nustd.{slug} has no page")
        if node.base != f"{REF}/nustd/{slug}":
            raise RuntimeError(
                f"fabric nustd.{slug} moved to {node.base}; lib/refs.ts expects nustd/{slug}"
            )


# --- the walk -------------------------------------------------------------


def _node(dotted: str, base: str) -> Node | None:
    records = _subjects(dotted)
    children = _children(dotted, records, base)
    if not records and not children:
        return None
    return Node(module=dotted, base=base, records=records, children=tuple(children))


def _children(dotted: str, records: tuple[Any, ...], base: str) -> list[Node]:
    """The pages nested under one page.

    A re-exported subpackage is a section, so it contributes no page of its own,
    but it is still walked: a package the *section* holds and the page does not
    re-export is still a page, and it lands at its mirrored path.
    ``nu.mem.refs.jqueue`` is the case, and ``nu.forms.collections.abc``.
    """
    out: list[Node] = []
    for sub in _subpackages(dotted):
        under = f"{base}/{_tail(sub)}"
        if _reexported(sub, records):
            out += _children(sub, records, under)
            continue
        node = _node(sub, under)
        if node is not None:
            out.append(node)
    return out


def _reexported(sub: str, records: tuple[Any, ...]) -> bool:
    """True when a subject the page exports is defined inside ``sub``."""
    return any(r.module == sub or r.module.startswith(f"{sub}.") for r in records)


def _subjects(dotted: str) -> tuple[Any, ...]:
    """Every record the six catalogues return, in export order, deduped by path."""
    module = _import(dotted)
    seen: dict[str, Any] = {}
    for catalogue in _CATALOGUES:
        for record in catalogue(module):
            seen.setdefault(record.path, record)
    return tuple(seen.values())


def _import(dotted: str) -> ModuleType:
    """Import, and say what to install when an optional dependency is missing.

    ``nu.mem.refs.jqueue`` needs the ``janus`` extra. Skipping it quietly would
    make the generated tree depend on which extras the generating machine
    happened to have, which is exactly what a committed, version-pinned tree is
    for.
    """
    if dotted in sys.modules:
        return sys.modules[dotted]
    try:
        return importlib.import_module(dotted)
    except ImportError as error:
        raise RuntimeError(
            f"{dotted} will not import: {error}. The tree is derived from what is "
            "installed, so generate against nustd[all]."
        ) from error


def _subpackages(dotted: str) -> list[str]:
    """Immediate subpackages, in name order, minus the private and the skipped."""
    module = _import(dotted)
    out = []
    for path in sorted(Path(p) for p in getattr(module, "__path__", ())):
        out += _packages_in(path, dotted)
    return out


def _packages_in(path: Path, prefix: str) -> list[str]:
    """The importable packages directly inside one directory."""
    out = []
    for child in sorted(path.iterdir()):
        name = f"{prefix}.{child.name}"
        if child.name.startswith(("_", ".")) or name in SKIP:
            continue
        if child.is_dir() and (child / "__init__.py").is_file():
            out.append(name)
    return out


def _tail(dotted: str) -> str:
    return dotted.rsplit(".", 1)[-1]
