---
id: errors
title: Error Handling
slug: /api/errors
---

Each API call provides an HTTP status code offering insights about the outcome of the request.

## 200 OK
The status codes of GraphQL HTTP differ from those of REST API. Notably, a 200 Successful code can be returned by the GraphQL API even in situations where REST would usually give a 4xx or 5xx error. If GraphQL can process the request, it will return a 200 status code with details about the success and/or errors.

A typical response from a GraphQl API is:

```graphql
{
  data: { /* a JSON object with the requested data */ },
  errors: [ /* an optional array of the errors that happened during the execution of the request */ ],
}
```

Each field of the GraphQL request is resolved independently and returns information if requested.

## Sample query
Combining a non-authorized and an authorized field in the same query.

```graphql
query me {
  globals {
    network
  }
  me {
    email {
      address
    }
  }
}
```

## Sample response

```json
{
  "data": {
    "globals": {
      "network": "signet"
    },
    "me": null
  },
  "errors": [
    {
      "message": "Not authorized",
      "locations": [
        {
          "line": 1,
          "column": 36
        }
      ],
      "path": [
        "me"
      ]
    }
  ]
}
```
In the example above, we were unable to resolve the `me.email.address` field but we got the `globals.network`. Can see both the successful and the error messages in the same response.

## 4xx and 500 status codes

Those errors occur before the request hits the Blink API. They may be related to network issues, account issues, malformed requests or Blink internal issues. Some examples below:

| Code | Description |
|------|-------------|
| `400` Bad Request | Often a malformed GraphQL request (for example, forgot to include the `query` field in the payload). |
| `401` Authorization Required| The authentication token is not valid and you are not authorized to send the request. |
| `429` Too Many Requests | There were too requests sent from your account or IP address in a short period of time and was rate limited. |
| `500` Internal Server Error | An error occurred on the Blink API server side, we will investigate as soon as possible. |
