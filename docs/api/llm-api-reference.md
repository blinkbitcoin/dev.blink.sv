---
id: llm-api-reference
title: Building with AI Agents
slug: /api/llm-api-reference
---

# Building with AI Agents

This guide is for **developers** who want to integrate AI agents or LLMs with the Blink API. It covers agent discovery, the machine-readable schema formats you can feed to your agent, and practical integration patterns.

:::tip For AI agents
If you are an AI agent, skip this page and follow the [AI Agent API Playbook](/api/agent-playbook) directly.
:::

## Agent Discovery with llms.txt

The site publishes a [`llms.txt`](https://dev.blink.sv/llms.txt) file at the root — a lightweight, structured file that gives any agent the endpoints, canonical source URLs, and hard rules in a single fetch:

```bash
curl -s https://dev.blink.sv/llms.txt
```

Point your agent at this URL first. It contains everything needed to bootstrap: production/staging GraphQL endpoints, auth header name, prioritized source list, and safety rules.

## Machine-Readable Schema Downloads

We provide the Blink GraphQL API schema in formats optimized for LLM consumption:

| Format | Best for | Download |
|--------|----------|----------|
| Enhanced LLM-friendly JSON | Most LLM apps, code generation | <a href="/reference/graphql-api-for-llm.json" download>graphql-api-for-llm.json</a> |
| OpenAPI specification | Function calling, automated integrations | <a href="/reference/graphql-openapi.json" download>graphql-openapi.json</a> |

## Integration Patterns

### Pattern 1: System prompt + schema (framework-agnostic)

The simplest approach — fetch the schema and playbook, then include them in the system prompt of any LLM:

```bash
# Fetch the schema and playbook once
curl -s https://dev.blink.sv/reference/graphql-api-for-llm.json -o blink-schema.json
curl -s https://dev.blink.sv/api/agent-playbook -o playbook.md
```

Then in your system prompt:

```
You are a Blink API assistant. Follow the playbook rules below strictly.

<playbook>
{contents of playbook.md}
</playbook>

<api_schema>
{contents of blink-schema.json}
</api_schema>
```

This works with any LLM provider — OpenAI, Anthropic, open-source models, etc.

### Pattern 2: Python with httpx

```python
import httpx
import json

# Fetch schema and playbook at startup
schema = httpx.get("https://dev.blink.sv/reference/graphql-api-for-llm.json").json()
playbook = httpx.get("https://dev.blink.sv/llms.txt").text

system_prompt = f"""
You are a Blink API assistant.
Follow these rules:\n{playbook}

API schema:\n{json.dumps(schema, indent=2)}
"""

# Use with any LLM client
# client.chat(system=system_prompt, messages=[...])
```

### Pattern 3: Node.js

```javascript
const schema = await fetch('https://dev.blink.sv/reference/graphql-api-for-llm.json').then(r => r.json());
const playbook = await fetch('https://dev.blink.sv/llms.txt').then(r => r.text());

const systemPrompt = `
You are a Blink API assistant.
Follow these rules:
${playbook}

API schema:
${JSON.stringify(schema, null, 2)}
`;

// Use with any LLM SDK
// e.g. OpenAI, Anthropic, etc.
```

## Generating Updated Schemas

The API reference files are automatically updated when the GraphQL schema changes. To generate them manually:

```bash
./scripts/generate-api-reference-combined.sh
```

## Additional Resources

- [AI Agent API Playbook](/api/agent-playbook) - Concise instruction set consumed directly by AI agents
- [No API Key Operations](/api/no-api-key-operations) - Unauthenticated query/mutation discovery
- [GraphQL Introduction](/api/graphql-intro) - Learn the basics of the GraphQL API
- [Authentication](/api/auth) - How to authenticate with the Blink API
