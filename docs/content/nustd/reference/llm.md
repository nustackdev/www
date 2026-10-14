---
title: llm
description: "Nu LLM fabric: OpenAI-compatible chat/completions, one wire, N providers."
---

Module `nustd.llm`.

Nu LLM fabric: OpenAI-compatible chat/completions, one wire, N providers.

Prefer `nu.arun` — LLM calls are network-bound and block the event loop under
sync. Sync is fine for one-off scripts.

Example (ollama on the red machine):

```python
class Bot(nu.Service):
    chat = nustd.llm.ChatRef.method(temperature=0.7)

app = nu.With(
    nustd.llm.ollama(Bot, host="red", model="qwen2.5:7b-instruct"),
    body=nu.print(nu.dict(Bot.chat(prompt="haiku about rust"))["text"]),
)
nu.run(app)
```

## interactions

Module `nustd.llm.interactions`.

Chat: ScalarAction that runs one chat/completions call.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Chat](#chat) | `scalar_action` | `Chat(ref, args)` | One chat/completions request against the endpoint a ChatRef addresses. |

### Chat

One chat/completions request against the endpoint a ChatRef addresses.

```python
Chat(ref, args)
```

Path `nustd.llm.Chat`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

Built by calling a ChatRef rather than written by hand. At evaluation it
resolves the Ref, merges the endpoint's declared defaults under this
call's kwargs, turns `prompt` into a one-message list when `messages`
was not given, and hands the body to the `LLMFabric` provided for the
owning Service.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the ChatRef naming the endpoint. |
| `args` |  |  | a Dict of this call's request body keys. |

**Yields**

A dict with `text` (the assistant's content, `""` when the
provider returned none), `message` (the raw message object),
`model`, `usage` and `finish_reason`. The last three are None
when the provider omits them.

**Notes**

- Declared as mutating its Ref child, so it is never reordered against or folded with other calls on the same endpoint.
- Only the merged body is sent; keys whose value is None are dropped before the request.
- No retry, no backoff, no streaming. A non-2xx response raises through httpx rather than yielding a sentinel.
- The sync path uses the fabric's blocking client, so it holds the thread for the whole round trip. Prefer `nu.arun`.

**Example**

```python
class Bot(nu.Service):
    chat = nustd.llm.ChatRef.method()
app = nu.With(
    nustd.llm.openai(Bot, api_key=key),
    body=nu.print(nu.dict(Bot.chat(prompt="one word: yes or no"))["text"]),
)
asyncio.run(nu.arun(app))
```

## refs

Module `nustd.llm.refs`.

ChatRef: Ref addressing a chat/completions endpoint on a Service.

Mirrors the nustd.http verb refs: `.method(**defaults)` returns a Method
declaration that the ServiceMeta descriptor unwraps at class access, and
calling the Ref with kwargs produces a Chat interaction.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ChatRef](#chatref) | `ref` | `ChatRef(name, owner_service=None)` | Addresses an OpenAI-compatible chat/completions endpoint on a Service. |

### ChatRef

Addresses an OpenAI-compatible chat/completions endpoint on a Service.

```python
ChatRef(name, owner_service=None)
```

Path `nustd.llm.ChatRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Written in a Service class body, one Ref per endpoint the Service talks
to. The Ref names no host, key or model of its own: which endpoint it
reaches is decided at run time by whichever `LLMFabric` was provided
for the owning Service class, so the same declaration can be pointed at
Ollama, OpenRouter or a self-hosted vLLM without being rewritten.

**Notes**

- Resolution is by owning Service class, so two Services in one program can hold ChatRefs against different providers.
- The endpoint path is fixed at `/v1/chat/completions`; only the base URL varies per provider.
- Nothing here is checked against a provider's schema. Unknown keys travel into the request body and the provider decides.

**Example**

```python
class Bot(nu.Service):
    chat = nustd.llm.ChatRef.method(temperature=0.7)
app = nu.With(
    nustd.llm.ollama(Bot, host="red", model="qwen2.5:7b-instruct"),
    body=nu.print(nu.dict(Bot.chat(prompt="haiku about rust"))["text"]),
)
nu.run(app)
```

**Methods**

#### `a(...)`

Build a Chat interaction over one turn's request body.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*kwargs` |  |  | either `prompt=` (sugar for one user message) or `messages=` (a full role/content list), plus any request body keys to override the endpoint defaults for this call. |

**Notes**

- Takes only keywords: `prompt=` (sugar for one user message) or `messages=` (a role/content list), plus any request-body keys overriding the endpoint defaults for this call.
- Exactly one of `prompt` or `messages` is needed; with neither, the call raises when it runs, not when it is built.
- `messages` wins when both are given, and `prompt` is dropped.
- Every kwarg is captured into a `Dict` child, so the values may themselves be Nu terms resolved at evaluation.

Undocumented: example.

## presets

Module `nustd.llm.presets`.

Providers for LLMFabric. `bind` is generic; the rest are convenience presets.

One wire (OpenAI-compatible /v1/chat/completions) covers OpenAI, OpenRouter,
Groq, Cerebras, xAI, vLLM, Ollama. Each preset just fills base_url + api_key.

| Name | Call | Meaning |
| --- | --- | --- |
| [bind](#bind) | `llm.bind(service_cls)` | Point every ChatRef on a Service at one endpoint, for the scope it is provided in. |
| [cerebras](#cerebras) | `llm.cerebras(service_cls, api_key, model)` | Bind a Service to Cerebras' wafer-scale inference API. |
| [groq](#groq) | `llm.groq(service_cls, api_key, model='llama-3.3-70b-versatile')` | Bind a Service to Groq's LPU-hosted open-weight models. |
| [ollama](#ollama) | `llm.ollama(service_cls, host='localhost', port=11434, model='', timeout=120.0)` | Bind a Service to a local or cluster Ollama daemon over its OpenAI-compatible API. |
| [openai](#openai) | `llm.openai(service_cls, api_key, model='gpt-4o-mini')` | Bind a Service to OpenAI's own hosted API. |
| [openrouter](#openrouter) | `llm.openrouter(service_cls, api_key, model)` | Bind a Service to OpenRouter, which fronts many vendors behind one key. |
| [vllm](#vllm) | `llm.vllm(service_cls, base_url, model, api_key='')` | Bind a Service to a vLLM server you run yourself. |
| [xai](#xai) | `llm.xai(service_cls, api_key, model='grok-2-latest')` | Bind a Service to xAI's Grok API. |

### bind

Point every ChatRef on a Service at one endpoint, for the scope it is provided in.

```python
llm.bind(service_cls)
```

Path `nustd.llm.bind`. Defined on `nustd.llm.presets`, bound as a function. Builds `Provide`.

The generic form the presets all funnel through. What it provides is
tagged by the Service class, which is how a ChatRef declared on that
class finds its fabric and how two Services can sit on two providers in
the same program.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose ChatRefs this endpoint serves. |

**Yields**

A Provide to hand to `nu.With`.

**Notes**

- The kwargs it accepts are `base_url` (required), `api_key`, `model`, `timeout` and `headers`. The presets are exactly this call with the first two filled in.
- The HTTP client opens when the `With` block is entered and closes when it exits, so calls outside the block raise.
- `api_key` becomes an `Authorization: Bearer` header unless `headers` already carries one.
- `model` here is the fallback; a declaration default or a call kwarg overrides it.

**Example**

```python
app = nu.With(nustd.llm.bind(Bot, base_url="http://red:8000", model="qwen3"), body=...)
```

### cerebras

Bind a Service to Cerebras' wafer-scale inference API.

```python
llm.cerebras(service_cls, api_key, model)
```

Path `nustd.llm.cerebras`. Defined on `nustd.llm.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose ChatRefs this endpoint serves. |
| `api_key` | `str` |  | a Cerebras key, sent as a bearer token. |
| `model` | `str` |  | required; the catalogue is small and moves, so no default is guessed. |

Undocumented: example.

### groq

Bind a Service to Groq's LPU-hosted open-weight models.

```python
llm.groq(service_cls, api_key, model='llama-3.3-70b-versatile')
```

Path `nustd.llm.groq`. Defined on `nustd.llm.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose ChatRefs this endpoint serves. |
| `api_key` | `str` |  | a Groq key, sent as a bearer token. |
| `model` | `str` | `'llama-3.3-70b-versatile'` | fallback model; overridable per declaration or per call. |

**Notes**

- Groq's OpenAI-compatible surface lives under an `/openai` path prefix rather than at the domain root.

Undocumented: example.

### ollama

Bind a Service to a local or cluster Ollama daemon over its OpenAI-compatible API.

```python
llm.ollama(service_cls, host='localhost', port=11434, model='', timeout=120.0)
```

Path `nustd.llm.ollama`. Defined on `nustd.llm.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose ChatRefs this endpoint serves. |
| `host` | `str` | `'localhost'` | machine running the daemon. |
| `port` | `int` | `11434` | the daemon's port. |
| `model` | `str` | `''` | fallback model tag; may be left empty and set per call. |
| `timeout` | `float` | `120.0` | seconds before the request gives up. |

**Notes**

- No API key: Ollama does not authenticate, so no Authorization header is sent.
- The generous default timeout is deliberate. A cold model is loaded from disk on first call and that can outlast a normal HTTP timeout.
- `model` is an Ollama tag (`qwen2.5:7b-instruct`), not an OpenAI model name.

Undocumented: example.

### openai

Bind a Service to OpenAI's own hosted API.

```python
llm.openai(service_cls, api_key, model='gpt-4o-mini')
```

Path `nustd.llm.openai`. Defined on `nustd.llm.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose ChatRefs this endpoint serves. |
| `api_key` | `str` |  | an OpenAI key, sent as a bearer token. |
| `model` | `str` | `'gpt-4o-mini'` | fallback model; overridable per declaration or per call. |

Undocumented: example.

### openrouter

Bind a Service to OpenRouter, which fronts many vendors behind one key.

```python
llm.openrouter(service_cls, api_key, model)
```

Path `nustd.llm.openrouter`. Defined on `nustd.llm.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose ChatRefs this endpoint serves. |
| `api_key` | `str` |  | an OpenRouter key, sent as a bearer token. |
| `model` | `str` |  | required, since there is no sensible default across thousands of models. Vendor-qualified, e.g. `anthropic/claude-sonnet-4`. |

Undocumented: example.

### vllm

Bind a Service to a vLLM server you run yourself.

```python
llm.vllm(service_cls, base_url, model, api_key='')
```

Path `nustd.llm.vllm`. Defined on `nustd.llm.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose ChatRefs this endpoint serves. |
| `base_url` | `str` |  | scheme, host and port of the server, e.g. `http://red:8000`. No path: the `/v1` prefix is added by the fabric. |
| `model` | `str` |  | required, and must match the name the server was launched with, since vLLM serves exactly one. |
| `api_key` | `str` | `''` | only needed when the server was started with one. |

Undocumented: example.

### xai

Bind a Service to xAI's Grok API.

```python
llm.xai(service_cls, api_key, model='grok-2-latest')
```

Path `nustd.llm.xai`. Defined on `nustd.llm.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose ChatRefs this endpoint serves. |
| `api_key` | `str` |  | an xAI key, sent as a bearer token. |
| `model` | `str` | `'grok-2-latest'` | fallback model; overridable per declaration or per call. |

Undocumented: example.
