---
id: blink-skills
title: Blink Skills
slug: /examples/blink-skills
---

Use Blink Skills to run Lightning wallet operations from agent workflows and scripts.

This repository provides a skill manifest plus self-contained Node.js scripts for common wallet actions like checking balances, creating invoices, paying, pricing, and swaps.

## Screenshot

<img src="https://opengraph.githubassets.com/1/blinkbitcoin/blink-skills" alt="Blink Skills repository preview" width="900"/>

## Quick Start

```bash
export BLINK_API_KEY="blink_..."

# Optional: use staging/signet for testing
export BLINK_API_URL="https://api.staging.blink.sv/graphql"

# Balance (includes USD estimate)
node blink/scripts/balance.js

# Create BTC invoice
node blink/scripts/create_invoice.js 1000 "Payment"

# Convert sats to USD
node blink/scripts/price.js 1760
```

## Typical Use Cases
* Check wallet balances and account status from scripts.
* Create and monitor BTC or USD invoices.
* Send Lightning payments from BTC or USD wallet.
* Get swap quotes and execute BTC <-> USD conversions.
* Interact with L402-gated services.

## Links
### Source Code
* [github.com/blinkbitcoin/blink-skills](https://github.com/blinkbitcoin/blink-skills)

### More Reading
* [github.com/blinkbitcoin/blink-skills/blob/main/README.md](https://github.com/blinkbitcoin/blink-skills/blob/main/README.md)
* [github.com/blinkbitcoin/blink-skills/blob/main/blink/SKILL.md](https://github.com/blinkbitcoin/blink-skills/blob/main/blink/SKILL.md)
