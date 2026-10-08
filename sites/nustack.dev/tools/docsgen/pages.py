"""The decisions. Everything else about the tree is derived.

There is no list of modules here, and that is the point of this wave. The page
tree comes out of :mod:`docsgen.discover`, which walks the two installed
distributions, so a module nobody remembered to list still gets a page. What is
left in this file is the handful of facts the code cannot tell us: where the
two distributions land, what a page is allowed to skip, which slugs are
load-bearing outside the docs tree, and how long a page gets before it becomes
a folder.
"""

from __future__ import annotations

from dataclasses import dataclass

__all__ = ["DISTRIBUTIONS", "FABRICS", "REF", "ROOTS", "SKIP", "SPLIT", "RootSpec"]

REF = "content/docs/reference"

DISTRIBUTIONS = (("nucore", "nu"), ("nustd", "nustd"))
"""Distribution to the directory it owns.

The tree mirrors what people install: ``reference/nu/`` is what ``nucore``
ships, ``reference/nustd/`` is what ``nustd`` ships. Below the directory the
docs path mirrors the module path, so nothing else about placement is a choice.
"""

SKIP = ()
"""Modules that exist, ship, and still get no page.

Empty, and two derived rules are why. A module with no subjects and no
documented descendant is dropped for having nothing to document, which retires
``nu.lang.laws``, ``nu.lang.runtime.context``, ``nu.engine.evaluation``,
``nu.engine.structure`` and ``nu.kv.views`` without anyone deciding they should
go. A module whose name starts with an underscore is dropped as private, which
retires ``nu._config``, whose own docstring opens with "Internal".

Everything else in both distributions is a public surface carrying a written
docstring. Naming one here would be an opinion about what a reader may see,
held in the one place nobody reads.
"""

FABRICS = ("kv", "ui", "cluster", "llm", "mem", "proxy", "http", "service", "cc", "mp")
"""The ten slugs that are load-bearing outside the docs tree.

``lib/refs.ts`` builds ``/docs/reference/nustd/<slug>`` and every marketing
fabric page links off it. Path mirroring produces all ten on its own, so this
is not a map, it is an assertion: ``discover.check_fabrics`` refuses to
generate the day one of them moves.
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


@dataclass(frozen=True)
class RootSpec:
    """One of the two distribution landing pages.

    Neither ``nu`` nor ``nustd`` is a module. They are the two things people
    pip install, so the page is the table of what is in the box and nothing
    else.
    """

    folder: str
    title: str

    @property
    def path(self) -> str:
        return f"{REF}/{self.folder}/index.md"


ROOTS = (RootSpec("nu", "Nu"), RootSpec("nustd", "Nu STD"))
