"""What a page is, once the records are gathered and grouped."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

__all__ = ["Child", "Page", "Root", "Section", "label", "slug"]

_NON_WORD = re.compile(r"[^a-z0-9]+")


def label(title: str, under: str) -> str:
    """A section's short name: its dotted path with the page's own prefix dropped.

    ``nu.mem.refs.std`` on the ``nu.mem`` page is ``refs.std``. The ancestry is
    already in the URL and in the page title, so repeating it in every heading
    says nothing. A section defined outside the page's own package
    (``nu.lang.forms`` on the ``nu.forms`` page) keeps its full path, because
    there the prefix is the news.
    """
    return title[len(under) + 1 :] if title.startswith(f"{under}.") else title


def slug(title: str) -> str:
    """A section's filename, off its label. ``refs.std`` is ``refs-std.md``."""
    return _NON_WORD.sub("-", title.lower()).strip("-")


@dataclass(frozen=True)
class Section:
    """One heading on a page, plus the subjects under it.

    ``title`` is the full dotted path of the defining submodule and ``label``
    is what the heading says. ``record`` is the submodule's own ``ModuleRecord``
    when the page sections by submodule, and None when it falls back to
    grouping by kind, where ``title`` is the kind and there is no module.
    """

    title: str
    record: Any | None
    subjects: tuple[Any, ...] = ()
    label: str = ""
    slug: str = ""

    @property
    def module(self) -> str:
        """The dotted module this section is, or "" when it is a kind."""
        return self.title if self.record is not None else ""


@dataclass(frozen=True)
class Child:
    """A page nested under this one, as it appears in the parent's table."""

    module: str
    url: str
    record: Any


@dataclass(frozen=True)
class Page:
    """One module's reference page: a single file, or a folder."""

    base: str
    module: str
    record: Any
    sections: tuple[Section, ...] = field(default_factory=tuple)
    children: tuple[Child, ...] = field(default_factory=tuple)

    @property
    def label(self) -> str:
        """The sidebar label: the last segment. The path carries the rest."""
        return self.module.rsplit(".", 1)[-1]

    @property
    def url(self) -> str:
        return "/" + self.base.removeprefix("content/")


@dataclass(frozen=True)
class Root:
    """A distribution landing page: a table of the top-level modules it ships."""

    path: str
    title: str
    children: tuple[Child, ...] = field(default_factory=tuple)
