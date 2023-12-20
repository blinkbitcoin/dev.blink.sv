---
id: websocket
title: Websocket connection
slug: /api/websocket
---

Websockets are used to receive real-time updates from the Blink API. The currently available websocket events are:

* `myUpdates`
* `lnInvoicePaymentStatus`
* `realtimePrice`
* `price`

The websocket endpoint of the Blink API on mainnet is:<br />
`wss://ws.blink.sv/graphql`


To try the subscriptions and explore the schema use the:<br />
[Apollo Playground for  Blink subscriptions](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fapi.blink.sv%2Fgraphql&subscriptions=wsss%3A%2F%2Fws.blink.sv%2Fgraphql&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QGcYCMtQBOAlgA4rERIAEAyngSeZUgBQAkxSpMK61AJQQBDADYVEABRJQEASW68AhAEpqwADo1qhEeOJSZCVlx59qnRSjWbt1HXokJpxWeq33P1YmA9fquChQtMIoLm62-p64wlgIflEQAGZJcSgJngC%2BGdnauZkgADQgAG7CJMK4oghYGCCR1BogprxN-A32TbCEukhQAJ5tjSAAqrQAIk1%2B%2BSCZQA)

Need to add the X-API-KEY header with your API key from the <br />
[Blink Dashboard](https://dashboard.blink.sv) to use the authenticated connection.
