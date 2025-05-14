---
id: oauth2
title: OAuth2 Integration
slug: /api/oauth2
---

# OAuth2 Integration Guide
The OAuth2 integration in Blink empowers third-party applications to authenticate and interact with the Blink backend services seamlessly. By leveraging [Ory Hydra](https://github.com/ory/hydra), an OAuth 2.0 and OpenID Connect server, applications can obtain secure access to the Blink API, enabling functionalities such as data access and transaction management within the Blink ecosystem.

## Getting Started
Before integrating with Blink OAuth2, it's crucial to have a foundational understanding of [OAuth 2.0](https://www.ory.sh/docs/oauth2-oidc/overview/oauth2-concepts) and [OpenID Connect (OIDC)](https://www.ory.sh/docs/oauth2-oidc/overview/oidc-concepts). These protocols facilitate secure authorization workflows between your application and Blink services, allowing for authenticated access to user-specific data and actions.<br />
The connecting applications are using the [OAuth2 authorization code flow](https://www.ory.sh/docs/oauth2-oidc/authorization-code-flow).<br />
For a hands-on introduction to setting up OAuth2 with Ory Hydra, you can explore this [5-minute tutorial](https://www.ory.sh/docs/hydra/5min-tutorial).

## Register Your Application
To initiate the integration process, your application must be registered and approved by Blink's development team. This is a critical step to ensure secure and authorized access to Blink's API functionalities.

### Application Approval
Reach out to the Blink development team via our Mattermost server at [chat.blink.sv](https://chat.blink.sv) to start the approval process for using OAuth2. You'll need to provide details about your application, including its purpose, the scopes of access required and your callback URL where the authorization code will be delivered.

#### Scopes
##### Read
* Allows queries returning user info, wallet balance, transaction history and other features.
##### Receive
* Allows to create invoices and generate onchain addresses.
* Note that there are methods to create invoices without authentication with a stricter rate limiting applied.
##### Write
* Allows to send payments and modify user data.

### Callback URL
After a user grants or denies access to your application, the Blink OAuth2 server will redirect the user back to your application using the callback (aka redirect) URL. This URL is where the Blink OAuth2 server sends the authorization code as a query parameter.

### Client ID and Secret
After the registration with Blink you will receive a client ID and a client secret from us. These are unique identifiers that allow the Blink OAuth2 server to identify your application and allow it to access protected resources. The client ID is considered public information and can be included in JavaScript source code or used to build login URLs. The client secret, however, must be kept confidential and is used to authenticate the client to the authorization server.

### OAuth2 Endpoints
#### Authorization Endpoint
* Blink
  ```
  https://oauth.blink.sv/oauth2/auth
  ```
* Staging
  ```
  https://oauth.staging.blink.sv/oauth2/auth
  ```
#### Token Endpoint
* Blink
  ```
  https://oauth.blink.sv/oauth2/token
  ```
* Staging
  ```
  https://oauth.staging.blink.sv/oauth2/token
  ```

## The OAuth2 Flow

### 1. Build the Authorization URL
* Construct a URL to redirect the user to the provider's authorization endpoint.
* Include the client ID, callback URI, response type (usually "code"), scopes (permissions you're requesting) and a minimum character long state parameter.

#### Example for staging:
* use a valid `client_id` which was registered with the OAuth2 server
* your redirect url (`yourapp.com/callback` in the example)
* the `state` parameter serves to identify the request
  ```
  https://oauth.staging.blink.sv/oauth2/auth?response_type=code&client_id=<client_id>&redirect_uri=https%3A%2F%2Fyourapp.com%2Fcallback&scope=read+receive+write&state=<request_identifier>
  ```

### 2. Redirect the User
Open the constructed URL to log in with OAuth2.
The user will log in to Blink and approve the requested permissions.
The Blink Oauth2 server will redirect the user to your callback URL with an authorization code in the query parameters.

### 3. Receive the Authorization Code
Your application should handle the callback request.
Extract the code parameter from the query string.
  ```
  https://yourapp.com/callback?code=ory_ac_AUTHORIZATION_CODE&scope=read+receive+write&state=<request_identifier>
  ```

### 4. Validate the State Parameter in the Callback
Ensure that the state parameter returned in the callback matches the one which was sent in the Authorization URL.

### 5. Exchange the Authorization Code for an Access Token
Make a POST request to the token endpoint with the authorization code, client ID, client secret, and redirect URI.

Example using curl:
  ```
  # set the variables
  AUTHORIZATION_CODE=<ory_ac_...>
  YOUR_CALLBACK_URL=<https://yourapp.com/callback>
  YOUR_CLIENT_ID=<client_id>
  YOUR_CLIENT_SECRET=<client_secret>

  curl -X POST \
    -u "$YOUR_CLIENT_ID:$YOUR_CLIENT_SECRET" \
    -d "grant_type=authorization_code" \
    -d "code=$AUTHORIZATION_CODE" \
    -d "redirect_uri=$YOUR_CALLBACK_URL" \
  https://oauth.blink.sv/oauth2/token
  ```

### 6. Handle the Access Token
The response will include an access token.
Store and use the access token to authenticate API requests.
Example response:
  ```
  {
    "access_token": "ory_at_...",
    "expires_in": 3599,
    "scope": "read receive write",
    "token_type": "bearer"
  }
  ```

### 7. Make Authenticated API Requests
Use the access token in the Authorization header of your API requests.
Example using curl:

```
ACCESS_TOKEN=<ory_at_...>

curl -sS --request POST --header 'content-type: application/json' \
  --header 'Oauth2-Token: $ACCESS_TOKEN' \
  --url 'https://api.blink.sv/graphql' \
  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}", "variables":{}}'
```

## Refresh Token Flow

Refresh tokens allow your application to obtain new access tokens without requiring users to re-authenticate. This is particularly useful for maintaining long-lived sessions and improving user experience.

### 1. Configure Your OAuth2 Client for Refresh Tokens

When registering your application with Blink, ensure that your OAuth2 client is configured to support refresh tokens by including the `refresh_token` grant type.

### 2. Request a Refresh Token During Authorization

To receive a refresh token along with your access token, include the `offline` scope in your authorization request:

```http
https://oauth.blink.sv/oauth2/auth?response_type=code&client_id=<client_id>&redirect_uri=https%3A%2F%2Fyourapp.com%2Fcallback&scope=read+receive+write+offline&state=<request_identifier>
```

The `offline` scope indicates that your application needs to access resources when the user is not present, which triggers the issuance of a refresh token.

### 3. Exchange Authorization Code for Tokens

When exchanging the authorization code for an access token, you'll now receive a refresh token in the response:

```bash
# set the variables
AUTHORIZATION_CODE=<ory_ac_...>
YOUR_CALLBACK_URL=<https://yourapp.com/callback>
YOUR_CLIENT_ID=<client_id>
YOUR_CLIENT_SECRET=<client_secret>

curl -X POST \
  -u "$YOUR_CLIENT_ID:$YOUR_CLIENT_SECRET" \
  -d "grant_type=authorization_code" \
  -d "code=$AUTHORIZATION_CODE" \
  -d "redirect_uri=$YOUR_CALLBACK_URL" \
https://oauth.blink.sv/oauth2/token
```

Example response with refresh token:

```json
{
  "access_token": "ory_at_...",
  "expires_in": 3599,
  "refresh_token": "ory_rt_...",
  "scope": "read receive write offline",
  "token_type": "bearer"
}
```

### 4. Use Refresh Token to Get a New Access Token

When your access token expires, use the refresh token to obtain a new one without requiring the user to log in again:

```bash
# set the variables
REFRESH_TOKEN=<ory_rt_...>
YOUR_CLIENT_ID=<client_id>
YOUR_CLIENT_SECRET=<client_secret>

curl -X POST \
  -u "$YOUR_CLIENT_ID:$YOUR_CLIENT_SECRET" \
  -d "grant_type=refresh_token" \
  -d "refresh_token=$REFRESH_TOKEN" \
https://oauth.blink.sv/oauth2/token
```

Example response:

```json
{
  "access_token": "ory_at_...",
  "expires_in": 3599,
  "refresh_token": "ory_rt_...",
  "scope": "read receive write offline",
  "token_type": "bearer"
}
```

### 5. Security Considerations

* Refresh tokens are long-lived credentials and should be stored securely
* Use HTTPS for all communications involving refresh tokens
* Implement token rotation - each time you use a refresh token, store the new refresh token and discard the old one
* Consider implementing refresh token expiration policies based on your security requirements
* If a refresh token is compromised, revoke it immediately

### 6. Example Implementation with next-auth

Here's how to implement refresh token handling with next-auth:

```typescript
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "blink",
      clientId: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET,
      wellKnown: `${env.HYDRA_PUBLIC}/.well-known/openid-configuration`,
      authorization: {
        params: { scope: "read receive write offline" },
      },
      idToken: false,
      name: "Blink",
      type: "oauth",
      profile(profile) {
        return {
          id: profile.sub,
        }
      },
    },
  ],
  debug: process.env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Initial sign in
      if (account && profile) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user: profile,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.error = token.error
      return session
    },
  },
}

// Helper to refresh the access token
async function refreshAccessToken(token) {
  try {
    const url = `${env.HYDRA_PUBLIC}/oauth2/token`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`).toString('base64')}`,
      },
      method: "POST",
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}
```

## Examples

### Using the Oauth2-Token Header

Note that the Oauth2 token needs a different header for Authentication (compared to API keys using the `X-API-KEY` header or the authentication token used in the Blink mobile app):

```text
"Oauth2-Token" "ory_at_..."
```

Example header for the Blink PoS:

```javascript
headers: {
  ...(options?.token ? { ["Oauth2-Token"]: options.token } : {}),
},
```

Link to the [code with the context](https://github.com/GaloyMoney/blink/pull/4149/files#diff-d5101fe657d3e5befe3ec31871012666597b3f346292241dffde4938c625090dR21).

### Using [next-auth](https://www.npmjs.com/package/next-auth) in the Blink PoS

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "blink",
      clientId: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET,
      wellKnown: `${env.HYDRA_PUBLIC}/.well-known/openid-configuration`,
      authorization: {
        params: { scope: "read" },
      },
      idToken: false,
      name: "Blink",
      type,
      profile(profile) {
        return {
          id: profile.sub,
        }
      },
    },
  ],
  debug: process.env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.expiresAt = account.expires_at
        token.refreshToken = account.refresh_token
        token.id = profile?.id
      }
      return token
    },
    async session({ session, token }) {
      if (
        !token.accessToken ||
        !token.sub ||
        typeof token.accessToken !== "string" ||
        typeof token.sub !== "string"
      ) {
        throw new Error("Invalid token")
      }
      const res = await fetchUserData({ token: token.accessToken })

      if (!(res instanceof Error)) {
        session.userData = res.data
      }
      session.sub = token.sub
      session.accessToken = token.accessToken
      return session
    },
  },
}
```

Link to the [code with the context](https://github.com/blinkbitcoin/blink/pull/4149/files#diff-224eae5be0d335d0d64941907106c189977dc51b2a0139459083b777efddf953R19-R70).

---

If you encounter any challenges or have questions during the integration process, don't hesitate to reach out to the Blink development team for assistance at our Mattermost server at [chat.blink.sv](https://chat.blink.sv).
