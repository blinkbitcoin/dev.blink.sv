---
id: pagination
title: Pagination
slug: /api/pagination
---

When you access the list of transactions all items will have an associated cursor position. This cursor can be used to paginate through the list by defining the `after` and / or `before` variable in the GraphQL request.

## Example request with pagination

Note the `pageInfo` object containing the cursor and page values. The `edges` object contains the transaction data.

* `endCursor`: When paginating forwards, the cursor to continue.
* `hasNextPage`: When paginating forwards, are there more items?
* `hasPreviousPage`: When paginating backwards, are there more items?
* `startCursor`: When paginating backwards, the cursor to continue.

```graphql
query transactionsForAccount($walletIds: [WalletId], $first: Int, $after: String) {
  me {
    id
    defaultAccount {
      transactions(walletIds: $walletIds, first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          cursor
          node {
            direction
            settlementCurrency
            settlementDisplayAmount
            status
          }
        }
      }
    }
  }
}
```

## Variables

* `first`: Returns the first n items from the list.
* `after`: Returns the items in the list that come after the specified cursor.
* `last`: Returns the last n items from the list.
* `before`: Returns the items in the list that come before the specified cursor.

The variables used in the request to show the first 2 transactions for the default account:

```json
{
  "first": 2,
  "after": null
}
```

Sample response showing the first 2 transactions:
```json
{
    "data": {
        "me": {
            "id": "dd3771d0-66b2-4b28-8757-b1a5db0f8fcf",
            "defaultAccount": {
                "transactions": {
                    "pageInfo": {
                        "endCursor": "6538b68c491e13fd6416722d",
                        "hasNextPage": true,
                        "hasPreviousPage": false,
                        "startCursor": "6538bda9491e13fd6416b5f3"
                    },
                    "edges": [
                        {
                            "cursor": "6538bda9491e13fd6416b5f3",
                            "node": {
                                "direction": "RECEIVE",
                                "settlementCurrency": "USD",
                                "settlementDisplayAmount": "0.01",
                                "status": "SUCCESS"
                            }
                        },
                        {
                            "cursor": "6538b68c491e13fd6416722d",
                            "node": {
                                "direction": "RECEIVE",
                                "settlementCurrency": "USD",
                                "settlementDisplayAmount": "1.00",
                                "status": "SUCCESS"
                            }
                        }
                    ]
                }
            }
        }
    }
}
```

## Request to show the next two transactions

To show the next two transactions the `endCursor` value from the previous response is used as the `after` variable in the next request:

```json
{
  "first": 2,
  "after": "653787e933905fc03c13e2bc"
}
```

Response showing the next two transactions:
```json
{
    "data": {
        "me": {
            "id": "dd3771d0-66b2-4b28-8757-b1a5db0f8fcf",
            "defaultAccount": {
                "transactions": {
                    "pageInfo": {
                        "endCursor": "653787c033905fc03c13e0a3",
                        "hasNextPage": true,
                        "hasPreviousPage": false,
                        "startCursor": "653787e933905fc03c13e286"
                    },
                    "edges": [
                        {
                            "cursor": "653787e933905fc03c13e286",
                            "node": {
                                "direction": "SEND",
                                "settlementCurrency": "BTC",
                                "settlementDisplayAmount": "-0.47",
                                "status": "SUCCESS"
                            }
                        },
                        {
                            "cursor": "653787c033905fc03c13e0a3",
                            "node": {
                                "direction": "SEND",
                                "settlementCurrency": "BTC",
                                "settlementDisplayAmount": "-0.47",
                                "status": "SUCCESS"
                            }
                        }
                    ]
                }
            }
        }
    }
}
```

:::tip
To test the GraphQL requests further use the GraphQL playground at [api.blink.sv/graphql](https://api.blink.sv/graphql) for mainnet or [api.staging.galoy.io/graphql](https://api.staging.galoy.io/graphql) for staging.<br />
Check out the [Galoy API Postman collection](https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ae685bc1-d637-48b2-8e32-4600eefc9a4e) to find examples in multiple programming languages.
:::
