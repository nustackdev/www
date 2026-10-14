"""The decisions. Everything else about the tree is derived.

There is no list of modules here. The page tree comes out of
:mod:`docsgen.discover`, which walks the installed distributions, so a module
nobody remembered to list still gets a page. What is left in this file is the
handful of facts the code cannot tell us: where each distribution and
extension lands, what a page is allowed to skip, which slugs are load-bearing
outside the docs tree, and how long a page gets before it becomes a folder.
"""

from __future__ import annotations

from dataclasses import dataclass

__all__ = ["DISTRIBUTIONS", "EXTENSIONS", "FABRICS", "SKIP", "SPLIT", "Dist", "Ext"]


@dataclass(frozen=True)
class Dist:
    """One distribution: what people install, what it imports as, where its reference lands.

    Each distribution gets the reference folder of its own docs section, so
    ``reference/`` holds exactly what that one install ships. Below the folder
    the docs path mirrors the module path, so nothing else about placement is
    a choice. ``index.md`` at the folder is the landing page: the table of
    what is in the box.
    """

    dist: str
    pkg: str
    ref: str
    title: str

    @property
    def path(self) -> str:
        return f"{self.ref}/index.md"


DISTRIBUTIONS = (
    Dist("nucore", "nu", "docs/content/nu/reference", "Nu"),
    Dist("nustd", "nustd", "docs/content/nustd/reference", "nustd"),
    Dist("nuspace", "nuspace", "docs/content/nuspace/reference", "nuspace"),
)
"""Every distribution with a reference, in the order they are generated."""


@dataclass(frozen=True)
class Ext:
    """One nuspace extension, by its ``nuspace.extensions`` entry point name.

    An extension's surface is what the ``+`` and ``/`` menus offer, not a
    module tree, so :mod:`docsgen.extensions` reads it off the registry
    instead of walking it.
    """

    name: str
    ref: str
    title: str

    @property
    def url(self) -> str:
        return "/docs/" + self.ref.removeprefix("docs/content/")


EXTENSIONS = (Ext("nuverse", "docs/content/nuverse/reference", "Reference"),)
"""Every extension with a catalogue."""

SKIP = ()
"""Modules that exist, ship, and still get no page.

Empty, and two derived rules are why. A module with no subjects and no
documented descendant is dropped for having nothing to document, which retires
``nu.lang.laws``, ``nu.lang.runtime.context``, ``nu.engine.evaluation``,
``nu.engine.structure`` and ``nu.kv.views`` without anyone deciding they should
go. A module whose name starts with an underscore is dropped as private, which
retires ``nu._config``, whose own docstring opens with "Internal".

Everything else in every distribution is a public surface carrying a written
docstring. Naming one here would be an opinion about what a reader may see,
held in the one place nobody reads.
"""

FABRICS = (
    "nustd.kv",
    "nustd.ui",
    "nustd.cluster",
    "nustd.llm",
    "nu.mem",
    "nustd.proxy",
    "nustd.http",
    "nustd.service",
    "nustd.cc",
    "nustd.mp",
)
"""The ten fabric modules that are load-bearing outside the docs tree.

The fabric table on ``docs/content/nu/index.mdx`` links each one's reference
page by hand, at its distribution's ``ref`` plus the module path below the
import root. Path mirroring produces all ten on its own, so this is not a map,
it is an assertion: ``discover.check_fabrics`` refuses to generate the day one
of them moves.
"""

SPLIT = 600
"""Line count above which a multi-section page becomes a folder.

600 rendered lines is already past what anyone scrolls. Below it the folder
form costs a directory, a ``meta.json`` and an extra click to buy nothing.
A single-section page never splits whatever its length: there is no seam to
cut on that the code declares, and inventing one is the emitter writing
structure the module does not have. A page with pages nested under it is a
folder whatever its length, because a file and a directory cannot both answer
to the same URL.
"""
