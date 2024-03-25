---
id: graphql-intro
title: GraphQL intro
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

API calls are authenticated with the `X-API-KEY` header containing an API key generated in the Blink Dashboard at [dashboard.blink.sv](https://dashboard.blink.sv). Find more about authentication in the [Authentication section](/api/auth)


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

## Learn more
Understanding these basic concepts of GraphQL will empower you to efficiently interact with our API.

For the detailed documentation on specific queries, mutations, and types available in our GraphQL schema use the following sources:

### GraphQL playground

* For the mainnet API endpoint and GraphQL playground connect to:

  https://api.blink.sv/graphql

* Find the staging API endpoint and GraphQL playground at:

  https://api.staging.galoy.io/graphql

### Public API reference
* visit: [dev.galoy.io/public-api-reference.html](https://dev.galoy.io/public-api-reference.html)

### GraphQL schema in the Galoy source code
* find it on GitHub: [/galoy/blob/main/core/api/src/graphql/public/schema.graphql](https://github.com/GaloyMoney/galoy/blob/main/core/api/src/graphql/public/schema.graphql)

### Preformed GraphQL queries

Dive deeper into constructing GraphQL queries with these preformed queries:c
* [galoy-mobile/blob/main/app/graphql/generated.gql](https://github.com/GaloyMoney/galoy-mobile/blob/main/app/graphql/generated.gql)

## Videos

### Using the Galoy GraphQL API

Arvin demoes the Galoy GraphQL API on 2022-Oct-26.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RRdpKnFe8qQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Getting started with the Galoy API

Arvin walks through how to use the Galoy API to send USD over Lightning on 2022-Mar-29.

<iframe width="560" height="315" src="https://www.youtube.com/embed/bp5Dc6Wvnbw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


