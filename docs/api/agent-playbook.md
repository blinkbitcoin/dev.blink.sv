---
id: agent-playbook
title: AI Agent API Playbook
slug: /api/agent-playbook
---

# AI Agent API Playbook

Use this playbook when an AI agent interacts with the Blink GraphQL API.

## Core Rule

If anything is unclear, incomplete, or ambiguous, the agent must check the API reference before generating a final answer or request payload.

## Required Order of Operations

1. Identify the user intent (for example: create invoice, send payment, check wallet balance).
2. Find the exact operation in the public API reference.
3. Validate all field names and input object names against the reference.
4. Validate required authentication and required scopes.
5. Validate response unions and error shapes.
6. Only then generate the GraphQL operation and example code.

## Discovery

Start here: [https://dev.blink.sv/llms.txt](https://dev.blink.sv/llms.txt) — structured metadata with endpoints, source URLs, and hard rules.

## Canonical Sources

Use these sources in this order:

1. LLM-friendly schema JSON (preferred): [/reference/graphql-api-for-llm.json](/reference/graphql-api-for-llm.json)
2. OpenAPI JSON (alternative): [/reference/graphql-openapi.json](/reference/graphql-openapi.json)
3. Public HTML API reference: [https://dev.blink.sv/public-api-reference.html](https://dev.blink.sv/public-api-reference.html)
4. No-key operations guide: [/api/no-api-key-operations](/api/no-api-key-operations)
5. Authentication guide: [/api/auth](/api/auth)
6. Error handling guide: [/api/errors](/api/errors)

## Safety and Accuracy Constraints

- Never invent mutations, fields, arguments, or enum values.
- Never assume authentication is optional unless the docs explicitly say so.
- Always include `X-API-KEY` for authenticated requests.
- Prefer minimal, valid GraphQL examples over broad speculative examples.
- If the docs and memory conflict, trust the docs.

## Fallback Behavior for Unclear Requests

When the user request is missing details, ask a short clarification question.
If authentication requirements are unclear, check [No API Key Operations](/api/no-api-key-operations) and then verify the exact operation in the public API reference.

Examples:

- "Should this be BTC or USD wallet flow?"
- "Do you want mainnet (`api.blink.sv`) or staging (`api.staging.blink.sv`)?"
- "Do you want a receive flow (invoice/address) or send flow (payment/payout)?"

## Environment Endpoints

- Production GraphQL: `https://api.blink.sv/graphql`
- Staging GraphQL: `https://api.staging.blink.sv/graphql`

## Minimal Verification Checklist

Before returning a final API answer, verify:

- Operation exists in reference
- Input types and required fields match reference
- Example includes correct auth header if required
- Response handling includes `errors` path and GraphQL error semantics

## Related Reading

- [GraphQL Intro](/api/graphql-intro)
- [Authentication](/api/auth)
- [Error Handling](/api/errors)
- [Pagination](/api/pagination)
- [Building with AI Agents](/api/llm-api-reference) - Schema downloads and integration examples for developers
