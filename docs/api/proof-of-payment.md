---
id: proof-of-payment
title: Proof of payment
slug: /api/proof-of-payment
---

Using Lightning even if the data is not recorded on the Bitcoin blockchain there is a cryptographic proof of payment consisting of:

* the lightning invoice - contents signed by the recipient node
* the pre-image, which the payer only receives when the invoice is paid.

## Request the invoices used for lightning payments

Queries the two most recent transactions paid via a lightning invoice (could settle over the lightning network or internally).

```graphql
query PaymentsWithProof($first: Int) {
  me {
    defaultAccount {
      transactions(first: $first) {
        edges {
          node {
            initiationVia {
              ... on InitiationViaLn {
                paymentRequest
                paymentHash
              }
            }
            settlementVia {
              ... on SettlementViaIntraLedger {
                preImage
              }
              ... on SettlementViaLn {
                preImage
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
                  "paymentRequest": "lntbs320n1pjehuh8pp5cf6ckqv265qu6ppul0mhv4qpw4zkmd6rcxx080f8cqaz3w5p5m2qhp5ermsf933ju2t2vzpehcndlf8kpjqa780h6kzaa5eevpq6s8a7t9qcqzpuxqyz5vqsp5xs2v586kum4lu7exwskukkf0wjyw29l50293c8scdetlvszdgdds9qyyssqgzxzle9hz6384qt8uzh74wy3ylp6g3yw74q06zelxuhxtgwk9ehxvgtmqh53furqceecm22jsv2aypcangdn2tayl0vl095qx0wh3hqpwrfl8j",
                  "paymentHash": "c2758b018ad501cd043cfbf776540175456db743c18cf3bd27c03a28ba81a6d4"
                },
                "settlementVia": {
                  "preImage": "9e92a2d24e89c92c93d2c63ffe126605bcd3bf614c727a1f6e3f52064b83c2ec"
                }
              }
            },
            {
              "node": {
                "initiationVia": {
                  "paymentRequest": "lntbs10n1pjehukhpp57ngk3ddxtmytqdzcyqa4l2e87ny29rwjsqx46g6m0pvpj7tvp6vshp5at629lcgdgt53gsapw77s59ykxxn7lkxyfk4n7zdx78c65s9502scqzpuxqyz5vqsp5nru4r9hu7asuvn86euyuskzdppl3lt4xue5wl8jxawaxc5rmzynq9qyyssq4c0d6lmszx6udlw8elv6dcawlsu7069fqd60wc4xxc3v6h5lmag45f8ks9lrdwnajysc0ka3lmgchfwrjjlgx4a8dg8g7gjlqaezecgqn706p3",
                  "paymentHash": "f4d168b5a65ec8b03458203b5fab27f4c8a28dd2800d5d235b785819796c0e99"
                },
                "settlementVia": {
                  "preImage": "f3a2290961be4b91bb230cfe7ae9d8159667dd9da33ca95b7c609bf82034285c"
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



:::tip
To test the GraphQL requests further use the GraphQL playground at [api.blink.sv/graphql](https://api.blink.sv/graphql) for mainnet or [api.staging.galoy.io/graphql](https://api.staging.galoy.io/graphql) for staging.<br />
Check out the [Galoy API Postman collection](https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ae685bc1-d637-48b2-8e32-4600eefc9a4e) to find examples in multiple programming languages.
:::
