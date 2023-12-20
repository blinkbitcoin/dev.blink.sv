---
id: websocket
title: Websocket connection
slug: /api/websocket
---

Websockets are used to receive real-time updates from the Blink API.

## Available websocket events

* `myUpdates`
* `lnInvoicePaymentStatus`
* `realtimePrice`
* `price`

## Websocket endpoint

`wss://ws.blink.sv/graphql`

## Playground
To try the subscriptions and explore the schema use the<br />
[Apollo Playground for Blink subscriptions](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fapi.blink.sv%2Fgraphql&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QGcYCMtQBOAlgA4rERIAEAyngSeZUgBQAkxSpMK61AJQQBDADYVEABRJQEASW68AhAEpqwADo1qhEeOJSZCVlx59qnRSjWbt1HXokJpxWeq33P1YmA9fquChQtMIoLm62-p64wlgIflEQAGZJcSgJngC%2BGdnauZkgADQgAG7CJMK4oghYGCCR1BogprxN-A32TbCEukhQAJ5tjSAAqrQAIk1%2B%2BSCZQA)

After loading the playground:

* open the `SANDBOX` connection settings and set:<br />
`wss://ws.blink.sv/graphql` as the `Subscriptions` URL then`Save`.

* add the `X-API-KEY` header with your API key from the <br />
[Blink Dashboard](https://dashboard.blink.sv) to authenticate the connection.
