---
id: graphql-intro
title: GraphQL Intro
slug: /api/graphql-intro
---

# Introduction to GraphQL
Welcome to our GraphQL API documentation! In this guide, we'll introduce you to the basics of GraphQL and how it pertains to our authentication and account management system.

## What is GraphQL?
GraphQL is a query language for your API and a runtime for executing those queries by using a type system you define for your data. It allows clients to request only the data they need, making it more efficient and flexible compared to traditional REST APIs.

## Me Query
Authentication Representation
The `me { }` query represents the authentication method. It allows users to query information about themselves while ensuring proper authentication and authorization.
Example:

```graphql
me {
  # Query fields related to user information
}
```
This query, when expanded with specific fields, allows you to access further details tied to your user account.

## Authentication with X-API-KEY

**All authenticated API calls require the `X-API-KEY` header** containing your API key. This is the primary authentication method for the Blink API.

```
X-API-KEY: blink_your_api_key_here
```

API keys can be generated in the Blink Dashboard at [dashboard.blink.sv](https://dashboard.blink.sv).

For detailed authentication instructions and examples, see the [Authentication section](/api/auth) and [Authentication Examples](/api/authentication-examples).


## Default Account Representation
Under the me query, the defaultAccount field represents what we refer to as the "master account." This is the primary account associated with the user, containing essential properties and settings.

Example:

```graphql
me {
  defaultAccount {
    # Query fields related to the master account
  }
}
```
By querying the defaultAccount, you can retrieve detailed information about your master account, such as account settings, preferences, and other key data points that define your interaction with our service.

## Wallets Representation
The `me { defaultAccount { wallets { } } }` query represents the wallets associated with the default account. Wallets are where balances and transactions are stored, providing a granular view of the user's financial activities.

Example:

```graphql
me {
  defaultAccount {
    wallets {
      # Query fields related to wallets
    }
  }
}
```
This query structure enables you to drill down into specific wallet details, such as transactions, balances, and other financial data, providing a comprehensive view of your financial standing and activity.

## Learn More
Understanding these basic concepts of GraphQL will empower you to efficiently interact with our API.

For the detailed documentation on specific queries, mutations, and types available in our GraphQL schema use the following sources:

### GraphQL Playground

* For the mainnet API endpoint and GraphQL playground connect to:

  https://api.blink.sv/graphql

* Find the staging API endpoint and GraphQL playground at:

  https://api.staging.blink.sv/graphql

### Public API Reference
* visit: [dev.blink.sv/public-api-reference.html](https://dev.blink.sv/public-api-reference.html)

### GraphQL Schema in the Galoy Source Code
* find it on GitHub: [/galoy/blob/main/core/api/src/graphql/public/schema.graphql](https://github.com/GaloyMoney/blink/blob/main/core/api/src/graphql/public/schema.graphql)

### Preformed GraphQL Queries
Dive deeper into constructing GraphQL queries with these preformed queries:c
* [galoy-mobile/blob/main/app/graphql/generated.gql](https://github.com/GaloyMoney/blink-mobile/blob/main/app/graphql/generated.gql)

### Postman Collection
* [Browse the collection and try in Postman](/api/postman)

## Videos
### Using the Galoy GraphQL API
Arvin demoes the Galoy GraphQL API on 2022-Oct-26.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RRdpKnFe8qQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Getting Started with the Galoy API

Arvin walks through how to use the Galoy API to send USD over Lightning on 2022-Mar-29.

<iframe width="560" height="315" src="https://www.youtube.com/embed/bp5Dc6Wvnbw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
