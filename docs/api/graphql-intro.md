---
id: graphql-into
title: GraphQL intro
slug: /api/graphql-into
---

Introduction to Our GraphQL Architecture
Welcome to the foundational guide of our GraphQL architecture. Our schema is designed to facilitate easy access to user-specific data, ranging from authentication details to account properties and transaction histories. Below, you will find a step-by-step guide that illustrates how to navigate our GraphQL queries to retrieve the information you need.

Authentication (me { })
The entry point to our GraphQL API is the me query. This query is designed to represent the authenticated user, providing a gateway to your personal data and actions within our system. To use this query, you must be authenticated, ensuring secure access to your information.

Example:

graphql
Copy code
me { }
This query, when expanded with specific fields, allows you to access further details tied to your user account.

Master Account (me { defaultAccount })
Under the me query, the defaultAccount field represents what we refer to as the "master account." This is the primary account associated with the user, containing essential properties and settings.

Example:

graphql
Copy code
me {
  defaultAccount
}
By querying the defaultAccount, you can retrieve detailed information about your master account, such as account settings, preferences, and other key data points that define your interaction with our service.

Wallets (me { defaultAccount { wallets } })
Diving deeper, the wallets field within the defaultAccount allows you to access your wallets. Wallets are crucial as they store your balance and transaction history, enabling you to manage and review your financial activities within our platform.

Example:

graphql
Copy code
me {
  defaultAccount {
    wallets {
      // Specify the fields you want to retrieve about wallets here
    }
  }
}
This query structure enables you to drill down into specific wallet details, such as transactions, balances, and other financial data, providing a comprehensive view of your financial standing and activity.

Conclusion
Our GraphQL architecture is designed with simplicity and flexibility in mind, ensuring that you can easily access and manage your account data. From authentication to managing your master account and diving into your wallets, this guide aims to provide a clear path for navigating our GraphQL API. Should you have any questions or require further assistance, please refer to our detailed documentation or reach out to our support team.

This introduction provides a basic overview and could be expanded with more detailed examples, including possible queries and their expected outputs, to further assist users in understanding how to interact with your GraphQL API.