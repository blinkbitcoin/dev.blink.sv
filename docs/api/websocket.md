---
id: websocket
title: Websocket connection
slug: /api/websocket
---

Websockets are used to receive real-time updates from the Blink API.<br />
Implemented using the [GraphQL over WebSocket Protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md)

## Available websocket events

* `myUpdates`
* `lnInvoicePaymentStatus`
* `realtimePrice`
* `price`

## Websocket endpoint

`wss://ws.blink.sv/graphql`

## Apollo Playground
To try the subscriptions and explore the schema use the<br />
[Apollo Playground for Blink subscriptions](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fapi.blink.sv%2Fgraphql&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QGcYCMtQBOAlgA4rERIAEAyngSeZUgBQAkxSpMK61AJQQBDADYVEABRJQEASW68AhAEpqwADo1qhEeOJSZCVlx59qnRSjWbt1HXokJpxWeq33P1YmA9fquChQtMIoLm62-p64wlgIflEQAGZJcSgJngC%2BGdnauZkgADQgAG7CJMK4oghYGCCR1BogprxN-A32TbCEukhQAJ5tjSAAqrQAIk1%2B%2BSCZQA)

After loading the playground:

* open the `SANDBOX` connection settings and set:<br />
`wss://ws.blink.sv/graphql` as the `Subscriptions` URL then `Save`.

* add the `X-API-KEY` header with your API key from the <br />
[Blink Dashboard](https://dashboard.blink.sv) to authenticate the connection.

## Postman
Try the websocket connection examples in the [Galoy API collection](https://www.postman.com/avionics-astronomer-21512623/workspace/galoy-api/ws-raw-request/65844dfbf0aa010f3874d5ff)

To use the raw websocket protocol in Postman there are a few steps to follow:

### Headers to use

* Define the protocol
  ```json
  Sec-WebSocket-Protocol: graphql-transport-ws
  ```
* For authenticated requests
  ```json
  X-API-KEY: <your api key>
  ```

### Send the `connection_init` request
* to get a `connection_ack` response 
  ```json
  {
    "type": "connection_init",
    "payload": {}
  }
  ```

### Send a subscription request
* use the format described in the [GraphQL over WebSocket Protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md#subscribe)
  ```json
  {
      "id": "1",
      "type": "subscribe",
      "payload": {
          "query": "subscription  {  price(    input: { amount: 100 amountCurrencyUnit: BTCSAT priceCurrencyUnit: USDCENT }  ) {    errors {      message    }    price {      base      offset      currencyUnit    }  }}",
          "variables": {}
      }
  }
  ```