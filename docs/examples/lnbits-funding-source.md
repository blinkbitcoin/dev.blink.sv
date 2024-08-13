---
id: lnbits-funding-source
title: LNbits Funding Source
slug: /examples/lnbits-funding-source
---

Since LNbits v0.12.9 Blink is available to be set as a funding source to serve the LNbits wallets and services.

## How to Set Up

### In the Super User Server Settings

* get a Blink API key at [dashboard.blink.sv](https://dashboard.blink.sv). Find more details about the Dashboard and API keys [here](https://dev.blink.sv/api/auth).

* log in as the [LNbits super user](https://github.com/lnbits/lnbits/blob/dev/docs/guide/admin\_ui.md)

* open the `Server` settings

  <img alt="LNbits super user" src="/img/lnbits_super_user.png" width="600"/>

* choose `Blink` from the dropdown menu under `Funding Sources` - `Active Funding (Requires server restart)`
* paste your API key to the `Key` field

  <img alt="LNbits Funding Sources" src="/img/lnbits_funding_sources.png" width="600"/>

* restart LNbits

### In the Terminal
* alternatively can edit the LNbits `.env` file directly if have access to the terminal on the server
  * set:
    ```
    LNBITS_BACKEND_WALLET_CLASS=BlinkWallet

    BLINK_API_ENDPOINT=https://api.blink.sv/graphql
    BLINK_WS_ENDPOINT=wss://ws.blink.sv/graphql
    BLINK_TOKEN=<YOUR_API_KEY_HERE>
    ```
  * restart LNbits to activate the new setting

## Source Code

* [lnbits/wallets/blink.py](https://github.com/lnbits/lnbits/blob/dev/lnbits/wallets/blink.py)
* merged PR: https://github.com/lnbits/lnbits/pull/2477

## More Info

* [Blink FAQ entry](https://faq.blink.sv/integrations/set-your-blink-account-as-an-lnbits-funding-source)
* [LNbits readme](https://github.com/lnbits/lnbits/blob/dev/docs/guide/wallets.md#blink)
