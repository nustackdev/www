"""Generates ``content/docs/reference/`` from ``nu.inspect``.

The code is the source of truth for every fact on a reference page, so the
pages are read off the records rather than written by hand. Run ``npm run
docs:gen`` to regenerate and ``npm run docs:gen:check`` to fail when the
committed output is stale.
"""

from __future__ import annotations
