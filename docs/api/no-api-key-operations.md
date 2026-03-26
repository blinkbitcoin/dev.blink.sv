---
id: no-api-key-operations
title: No API Key Operations
slug: /api/no-api-key-operations
---

# No API Key Operations

This page highlights public GraphQL operations commonly used without an API key.

:::note
This list is intended for quick discovery.
Always verify the latest behavior in the public API reference before shipping production code.
:::

## Mutations commonly used without `X-API-KEY`

These are the no-key mutations commonly used in login and invoice-on-behalf flows:

- [`lnInvoiceCreateOnBehalfOfRecipient`](https://dev.blink.sv/public-api-reference.html#mutation-lnInvoiceCreateOnBehalfOfRecipient)
- [`lnNoAmountInvoiceCreateOnBehalfOfRecipient`](https://dev.blink.sv/public-api-reference.html#mutation-lnNoAmountInvoiceCreateOnBehalfOfRecipient)
- [`lnUsdInvoiceCreateOnBehalfOfRecipient`](https://dev.blink.sv/public-api-reference.html#mutation-lnUsdInvoiceCreateOnBehalfOfRecipient)
- [`lnUsdInvoiceBtcDenominatedCreateOnBehalfOfRecipient`](https://dev.blink.sv/public-api-reference.html#mutation-lnUsdInvoiceBtcDenominatedCreateOnBehalfOfRecipient)

## Queries commonly used without `X-API-KEY`

- [`accountDefaultWallet`](https://dev.blink.sv/public-api-reference.html#query-accountDefaultWallet)
- [`lnInvoicePaymentStatusByPaymentRequest`](https://dev.blink.sv/public-api-reference.html#query-lnInvoicePaymentStatusByPaymentRequest)
- [`lnInvoicePaymentStatusByHash`](https://dev.blink.sv/public-api-reference.html#query-lnInvoicePaymentStatusByHash) (legacy, prefer `lnInvoicePaymentStatusByPaymentRequest`)
- [`btcPriceList`](https://dev.blink.sv/public-api-reference.html#query-btcPriceList)
- [`businessMapMarkers`](https://dev.blink.sv/public-api-reference.html#query-businessMapMarkers)

## Agent Rule

When an agent needs an unauthenticated flow:

1. Start from this page.
2. Open the exact operation in the public API reference.
3. Confirm the required input object and response shape.
4. If anything is unclear, check `/reference/graphql-api-for-llm.json` before generating code.
5. If the operation needs auth after all, retry with `X-API-KEY` and the minimum required scope.

## Related Docs

- [Authentication](/api/auth)
- [API Reference for LLMs](/api/llm-api-reference)
- [AI Agent API Playbook](/api/agent-playbook)
- [Public API Reference](https://dev.blink.sv/public-api-reference.html)
