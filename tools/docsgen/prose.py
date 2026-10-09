"""reStructuredText leftovers out, markdown in.

Nu docstrings are written in a light reST: double-backtick literals, Sphinx
cross-reference roles, underlined section headers and ``::`` literal blocks.
Fumadocs renders markdown. Every rewrite here is mechanical and lossless in
meaning: no sentence is added, dropped or reworded.
"""

from __future__ import annotations

import re
import textwrap

__all__ = ["cell", "text"]

_ROLE = re.compile(r":(?:class|func|meth|mod|attr|obj|data|exc|ref):`~?([^`]+)`")
_LITERAL = re.compile(r"``([^`]+)``")
_UNDERLINE = re.compile(r"^([-=~^\"'+*#`]){3,}\s*$")


def text(raw: str) -> str:
    """Rewrite a docstring block as markdown."""
    if not raw.strip():
        return ""
    lines = _dedent(raw.rstrip()).split("\n")
    out: list[str] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        following = lines[index + 1] if index + 1 < len(lines) else ""
        if line.strip() and _UNDERLINE.match(following) and not line.startswith(" "):
            out.append(f"#### {_inline(line.strip())}")
            index += 2
            continue
        if line.rstrip().endswith("::") and line.strip() != "::":
            out.append(_inline(line.rstrip()[:-1]))
            index += 1
            index = _fence(lines, index, out)
            continue
        if line.strip() == "::":
            index += 1
            index = _fence(lines, index, out)
            continue
        out.append(_inline(line))
        index += 1
    return "\n".join(out).strip()


def cell(raw: str) -> str:
    """Rewrite a docstring block as one markdown table cell."""
    flat = " ".join(_inline(raw).split())
    return flat.replace("|", "\\|")


def _dedent(raw: str) -> str:
    """Strip the block indent a docstring's first line does not share.

    ``split_docstring`` dedents against the whole docstring, and the summary
    sits on the opening quotes at column zero, so every block after it keeps
    the class body's indent on all lines but its first. Relative indentation,
    which carries nested lists and literal blocks, survives.
    """
    first, _, rest = raw.partition("\n")
    if not rest.strip():
        return raw
    return first + "\n" + textwrap.dedent(rest)


def _fence(lines: list[str], index: int, out: list[str]) -> int:
    """Consume a reST literal block at ``index``, appending a fence to ``out``."""
    while index < len(lines) and not lines[index].strip():
        index += 1
    block: list[str] = []
    while index < len(lines):
        line = lines[index]
        if line.strip() and not line.startswith(("    ", "\t")):
            break
        block.append(line)
        index += 1
    while block and not block[-1].strip():
        block.pop()
    if not block:
        return index
    indent = min(len(b) - len(b.lstrip()) for b in block if b.strip())
    out.append("")
    out.append("```python")
    out.extend(b[indent:] for b in block)
    out.append("```")
    out.append("")
    return index


def _inline(line: str) -> str:
    """Rewrite inline reST markup on one line."""
    line = _ROLE.sub(lambda m: f"`{m.group(1).rsplit('.', 1)[-1]}`", line)
    return _LITERAL.sub(lambda m: f"`{m.group(1)}`", line)
