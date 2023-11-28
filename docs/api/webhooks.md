---
id: webhooks
title: Webhooks
slug: /api/webhooks
---

# Webhooks

The Blink API offers a selection of webhooks (or callbacks), allowing external applications to receive instantaneous notifications about activities on your account. For example the webhooks can be used to make a LED light up or a beer tap to open on the receipt of a payment.

The currently available webhook events are:

* `send.lightning`
* `receive.lightning`
* `send.intraledger`
* `receive.intraledger`
* `send.onchain`
* `receive.onchain`

## Create a webhook endpoint to receive events
Visit [play.svix.com](https://play.svix.com/) to quickly set up a webhook endpoint for testing.

Your endpoint MUST return a 2xx HTTP status code in a timely manner. If the backend doesn't receive that response it will be taken as the endpoint is offline and the Blink API will retry to send the event a few times.

Example payload sent on a `receive.lightning` event:
```json
{
   "accountId":"1580f7f2-0e4c-4187-b97f-9ed6eaff8f55",
   "eventType":"receive.lightning",
   "walletId":"21087d73-80d8-4556-a73a-e1b6b0657784",
   "transaction":{
      "createdAt":"2023-11-21T01:49:38.375Z",
      "id":"655cd1926445716f60b89418",
      "initiationVia":{
         "paymentHash":"bf6b61f814b2e2284f5cbb7c9f9e67887018ffe3f53bedb9b70dec0a15ebca1c",
         "pubkey":"d75a81acb76fd85dafe491799bbd1940a25e8a8fa776cacccda4ee8444555e3e",
         "type":"lightning"
      },
      "memo":null,
      "settlementAmount":2707,
      "settlementCurrency":"BTC",
      "settlementDisplayAmount":"1.00",
      "settlementDisplayFee":"0.00",
      "settlementDisplayPrice":{
         "base":"36941263391",
         "displayCurrency":"USD",
         "offset":"12",
         "walletCurrency":"BTC"
      },
      "settlementFee":0,
      "settlementVia":{
         "type":"lightning"
      },
      "status":"success",
      "walletId":"21087d73-80d8-4556-a73a-e1b6b0657784"
   }
}
```

The calls to register, list and remove webhooks are made through the GraphQL API as described below.

:::tip
To test the GraphQL requests further use the GraphQL playground at [api.blink.sv/graphql](https://api.blink.sv/graphql) for mainnet or [api.staging.galoy.io/graphql](https://api.staging.galoy.io/graphql) for staging.<br />
Check out the [Galoy API Postman collection](https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#0be26540-d31c-4d0e-b7ac-400fc73bdb80) to find examples in multiple programming languages.
:::

## Using the Blink Dashboard to manage webhooks

Log in to the [Blink Dashboard](https://dashboard.blink.sv) and select the `Callback Endpoints` page to add or remove the webhooks.

![Webhooks](../images/webhooks_dashboard.png)

## Using the API to manage webhooks
### Add a callback endpoint

Use the graphql mutation `callbackEndpointAdd` to add a callback endpoint to the account.

```graphql
mutation CallbackEndpointAdd($input: CallbackEndpointAddInput!) {
  callbackEndpointAdd(input: $input) {
    id
    errors {
      code
      message
      path
    }
  }
}
```

Variables to use (change to your own endpoint):
```json
{
  "input": {
    "url": "https://play.svix.com/view/e_G9H4c3IhcV64t2rn5yXrf6PAhzP"
  }
}
```

### List the configured callback endpoints

Use the graphql query `callbackEndpoints` to list the callback endpoints configured for the account.

```graphql
query CallbackEndpoints {
  me {
    defaultAccount {
      callbackEndpoints {
        id
        url
      }
    }
  }
}
```

Example response:
```json
{
  "data": {
    "me": {
      "defaultAccount": {
        "callbackEndpoints": [
          {
            "url": "https://play.svix.com/in/e_199jAau4I029pKkrMpkeQF5ll6E/",
            "id": "ep_2XFLziymYU6yesALDZBaI3Zrk7L"
          }
        ]
      }
    }
  }
}
```

### Delete a callback endpoint

Use the graphql mutation `callbackEndpointDelete` to delete a callback endpoint from the account.

```graphql
mutation CallbackEndpointDelete($input: CallbackEndpointDeleteInput!) {
  callbackEndpointDelete(input: $input) {
    success
    errors {
      code
      message
      path
    }
  }
}
```

Variables to use (change to the endpoint id you want to delete):
```json
{
  "input": {
    "id": "ep_2XFLziymYU6yesALDZBaI3Zrk7L"
  }
}
```
