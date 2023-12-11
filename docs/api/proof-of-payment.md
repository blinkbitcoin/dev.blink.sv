---
id: proof-of-payment
title: Proof of payment
slug: /api/proof-of-payment
---

Using Lightning even if the data is not recorded on the Bitcoin blockchain there is a cryptographic proof of payment consisting of:

* the lightning invoice - contents signed by the recipient node
* the pre-image, which the payer only receives when the invoice is paid.

## Request the invoices used for lightning payments

Queries the two most recent transactions paid via lightning.

```graphql
query InitiationViaLn($first: Int) {
  me {
    defaultAccount {
      transactions(first: $first) {
        edges {
          node {
            initiationVia {
              ... on InitiationViaLn {
                paymentHash
                paymentRequest
              }
            }
          }
        }
      }
    }
  }
}
```

### Variable to show the two most recent transactions
```json
{
  "first": 2
}
```

### Sample response showing the invoices
```
{
  "data": {
    "me": {
      "defaultAccount": {
        "transactions": {
          "edges": [
            {
              "node": {
                "initiationVia": {
                  "paymentHash": "74de21dc88f9f870fad49a110ec6f8916ebb59eb3b534d9b6ab8f9bb51196a1d",
                  "paymentRequest": "lntbs1220n1pjklpx5pp5wn0zrhygl8u8p7k5nggsa3hcj9htkk0t8df5mxm2hrumk5gedgwsdq0w3jhxapqd4jk6mccqzpuxqyz5vqsp566v7qag22wnl5spf3zhrfruxyaek5m3uv5pu4dzpwmffk6adykpq9qyyssq62exrk3zcwfeh9c0hnhlpv9lmn33fryz4l9acmq79myp57lgj29390tucf4rycxn3zxtre8fzuzs6acu0w4umuetu9zr04zusa56duspsmsxv5"
                }
              }
            },
            {
              "node": {
                "initiationVia": {
                  "paymentHash": "6cce0fbd9f6df7eb07721bdbf89fa5ca26e30cb41c0bb8f0e78c8ef8bf8bfa33",
                  "paymentRequest": "lntbs11110n1pjk7l0qpp5dn8ql0vldhm7kpmjr0dl38a9egnwxr95rs9m3u883j8030utlgesdq0w3jhxapqd4jk6mccqzpuxqyz5vqsp5c6s3ny7zexukzgx0nyj2tzscsz8fksglth3cvmrqj8fsns4fldzq9qyyssqvzq3cwhglu6n6arw9hj6jydvznp0w7enhxdm8srgrfukj5xgym2puumjkh6k0y8kg2px4l3072m7nys9lqp4shsw3tfmmeapsnh63xsqxwhlz8"
                }
              }
            }
          ]
        }
      }
    }
  }
}
```
The invoice can be used to identify the destination node and analyze other contents by decoding it for example in: [dev.blink.sv/decode](https://dev.blink.sv/decode)

## Request the proof of payment


:::tip
To test the GraphQL requests further use the GraphQL playground at [api.blink.sv/graphql](https://api.blink.sv/graphql) for mainnet or [api.staging.galoy.io/graphql](https://api.staging.galoy.io/graphql) for staging.<br />
Check out the [Galoy API Postman collection](https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ae685bc1-d637-48b2-8e32-4600eefc9a4e) to find examples in multiple programming languages.
:::
