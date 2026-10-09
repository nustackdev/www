---
title: core
description: "Everything that is not specific to a kind."
---

Module `nu.inspect.core`.

Everything that is not specific to a kind.

Knowledge about any Nu thing comes from exactly two places, the code and the
docstring, and there is no third. That split is the layout:

- `docstring` reads what was written.
- `source` reads what the code says.
- `contract` says which written facts are required, merges the two sources
  where a question needs both, and checks the result.

`docstring` and `source` know nothing of Nu or of the contract.
`contract` knows the contract and nothing of Nu. The kinds sit on top.

**Modules**

| Module | What |
| --- | --- |
| [`nu.inspect.core.contract`](/docs/reference/nu/inspect/core/contract) | The docstring contract: what a written fact may not lie about. |
| [`nu.inspect.core.docstring`](/docs/reference/nu/inspect/core/docstring) | What was written: a docstring, parsed. |
| [`nu.inspect.core.source`](/docs/reference/nu/inspect/core/source) | What the code says: a Python object, introspected. |
