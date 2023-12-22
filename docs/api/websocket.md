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

### Header to use
* Define the protocol
  ```json
  Sec-WebSocket-Protocol: graphql-transport-ws
  ```

### Send the `connection_init` request
* to get a `connection_ack` response
  ```json
  {
    "type": "connection_init",
    "payload": {}
  }
  ```
### For authenticated requests
* include the api key in the payload of the `connection_init` request
  ```json
  {
    "type": "connection_init",
    "payload": {
      "X-API-KEY": "<your api key>"
    }
  }
  ```

### Send a subscription request
* use the format described in the [GraphQL over WebSocket Protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md#subscribe)
* need to paste the message in place of the `connection_init` message to continue using the same connection
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

## websocat
* Install with:
  * Linux (with a Rust toolchain installed)
    ```bash
    cargo install websocat
    ```
  * MacOS
    ```bash
    brew install websocat
    ```

* Connect to the websocket endpoint
  ```bash
  websocat ${websocket_endpoint} -H 'Sec-WebSocket-Protocol: graphql-transport-ws' -v
  ```

### Usage without authentication
* Send the `connection_init` request for non-authenticated requests
  ```json
  { "type": "connection_init", "payload": {} }
  ```

* price subscription message
  ```json
  { "id": "1", "type": "subscribe", "payload": {  "query": "subscription { price( input: { amount: 100 amountCurrencyUnit: BTCSAT priceCurrencyUnit: USDCENT } ) { errors { message } price { base offset currencyUnit } }}",  "variables": {} }}
  ```
* realtimePrice subscription message
  ```json
  { "id": "2", "type": "subscribe", "payload": { "query": "subscription realtimePrice($input: RealtimePriceInput!) { realtimePrice(input: $input) { realtimePrice { id btcSatPrice { base offset } } errors { code message path } }}", "variables": { "input": { "currency": "USD" } } }}
  ```

### Example output
* ```bash
  websocat ${websocket_endpoint} -H 'Sec-WebSocket-Protocol: graphql-transport-ws' -v
  [INFO  websocat::lints] Auto-inserting the line mode
  [INFO  websocat::stdio_threaded_peer] get_stdio_peer (threaded)
  [INFO  websocat::ws_client_peer] get_ws_client_peer
  [INFO  websocat::ws_client_peer] Connected to ws
  { "type": "connection_init", "payload": {}}
  {"type":"connection_ack"}
  { "id": "1", "type": "subscribe", "payload": {  "query": "subscription { price( input: { amount: 100 amountCurrencyUnit: BTCSAT priceCurrencyUnit: USDCENT } ) { errors { message } price { base offset currencyUnit } }}",  "variables": {} }}
  {"id":"1","type":"next","payload":{"data":{"price":{"errors":[],"price":{"base":4364414843750,"offset":12,"currencyUnit":"USDCENT"}}}}}
  [INFO  websocat::ws_peer] Received WebSocket ping
  { "id": "2", "type": "subscribe", "payload": { "query": "subscription realtimePrice($input: RealtimePriceInput!) { realtimePrice(input: $input) { realtimePrice { id btcSatPrice { base offset } } errors { code message path } }}", "variables": { "input": { "currency": "USD" } } }}
  {"id":"2","type":"next","payload":{"data":{"realtimePrice":{"realtimePrice":{"id":"a6e2abdb-431e-5455-81c1-92fbaccfb0de","btcSatPrice":{"base":43623050781,"offset":12}},"errors":[]}}}}
  [INFO  websocat::ws_peer] Received WebSocket ping
  {"id":"1","type":"next","payload":{"data":{"price":{"errors":[],"price":{"base":4362700000000,"offset":12,"currencyUnit":"USDCENT"}}}}}
  {"id":"2","type":"next","payload":{"data":{"realtimePrice":{"realtimePrice":{"id":"6d453741-e0ad-5fec-b27f-3d987571f5ad","btcSatPrice":{"base":43627000000,"offset":12}},"errors":[]}}}}
  ```

### Authenticated usage

* Send the `connection_init` request for authenticated requests
  ```json
  { "type": "connection_init", "payload": { "X-API-KEY": "${api_key}" } }
  ```

* myUpdates subscription message
  ```json
  { "id": "1", "type": "subscribe", "payload": { "query": "subscription { myUpdates { update { ... on LnUpdate { transaction { initiationVia { ... on InitiationViaLn { paymentHash } } direction } } } } }", "variables": {} }}
  ```
* lnInvoicePaymentStatus subscription message
  ```json
  { "id": "2", "type": "subscribe", "payload": { "query": "subscription LnInvoicePaymentStatus($input: LnInvoicePaymentStatusInput!) { lnInvoicePaymentStatus(input: $input) { status errors { code message path } }}", "variables": { "input": { "paymentRequest": "lnbc...." } } }}
  ```

### Example output
* ```bash
  websocat ${websocket_endpoint} -H 'Sec-WebSocket-Protocol: graphql-transport-ws' -v
  [INFO  websocat::lints] Auto-inserting the line mode
  [INFO  websocat::stdio_threaded_peer] get_stdio_peer (threaded)
  [INFO  websocat::ws_client_peer] get_ws_client_peer
  [INFO  websocat::ws_client_peer] Connected to ws
  { "type": "connection_init", "payload": { "X-API-KEY": "galoy_staging_BAMGaY2PPxmAkQwILLNWTlrEJOm1R7cS82CzvviSB9jCrvBumrXwOdjMri41rUCE" } }
  {"type":"connection_ack"}
  [INFO  websocat::ws_peer] Received WebSocket ping
  { "id": "1", "type": "subscribe", "payload": { "query": "subscription { myUpdates { update { ... on LnUpdate { transaction { initiationVia { ... on InitiationViaLn { paymentHash } } direction } } } } }", "variables": {} }}
  {"id":"1","type":"next","payload":{"data":{"myUpdates":{"update":{}}}}}
  {"id":"1","type":"next","payload":{"data":{"myUpdates":{"update":{}}}}}
  [INFO  websocat::ws_peer] Received WebSocket ping
  {"id":"1","type":"next","payload":{"data":{"myUpdates":{"update":{}}}}}
  {"id":"1","type":"next","payload":{"data":{"myUpdates":{"update":{}}}}}
  { "id": "2", "type": "subscribe", "payload": { "query": "subscription LnInvoicePaymentStatus($input: LnInvoicePaymentStatusInput!) { lnInvoicePaymentStatus(input: $input) { status errors { code message path } }}", "variables": { "input": { "paymentRequest": "lntbs1220n1pjklpx5pp5wn0zrhygl8u8p7k5nggsa3hcj9htkk0t8df5mxm2hrumk5gedgwsdq0w3jhxapqd4jk6mccqzpuxqyz5vqsp566v7qag22wnl5spf3zhrfruxyaek5m3uv5pu4dzpwmffk6adykpq9qyyssq62exrk3zcwfeh9c0hnhlpv9lmn33fryz4l9acmq79myp57lgj29390tucf4rycxn3zxtre8fzuzs6acu0w4umuetu9zr04zusa56duspsmsxv5" } } }}
  {"id":"2","type":"next","payload":{"data":{"lnInvoicePaymentStatus":{"status":"PAID","errors":[]}}}}
  [INFO  websocat::ws_peer] Received WebSocket ping
  ```

## Test implementation in the galoy backend

* [galoy/bats/helpers/subscriber/src/gql-subscribe.ts](https://github.com/GaloyMoney/galoy/blob/e010ac0ac2020d546ec2dbbd1a6680ac1a0282af/bats/helpers/subscriber/src/gql-subscribe.ts)
