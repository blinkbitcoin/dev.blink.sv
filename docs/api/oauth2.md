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
Reach out to the Blink development team via our Mattermost server at [chat.galoy.io](https://chat.galoy.io) to start the approval process for using OAuth2. You'll need to provide details about your application, including its purpose, the scopes of access required and your callback URL where the authorization code will be delivered.

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

## Configuration Examples
Below are the Terraform configurations for two existing Blink integrations, showcasing how to set up OAuth2 clients for different applications using the [hydra_oauth2_client Terraform resource](https://registry.terraform.io/providers/svrakitin/hydra/latest/docs/resources/oauth2_client) :

### Blink Dashboard
* try it at [dashboard.blink.sv](https://dashboard.blink.sv)
```
resource "hydra_oauth2_client" "api_dashboard" {
  client_name                = "Blink Api Dashboard"
  grant_types                = ["authorization_code"]
  response_types             = ["code", "id_token"]
  token_endpoint_auth_method = "client_secret_basic"
  scopes                     = ["read", "write"]
  redirect_uris              = [local.api_dashboard_hydra_redirect_uri]
  skip_consent               = true
}
```
### Blink PoS
* try it at [pay.blink.sv](https://pay.blink.sv)
```
resource "hydra_oauth2_client" "galoy_pay" {
  client_name                = "Blink POS"
  grant_types                = ["authorization_code"]
  response_types             = ["code", "id_token"]
  token_endpoint_auth_method = "client_secret_basic"
  scopes                     = ["read"]
  redirect_uris              = [for host in local.galoy_pay_hosts : "https://${host}/api/auth/callback/blink"]
  skip_consent               = true
}
```

## The OAuth2 Flow

### 1. Build the Authorization URL
* Construct a URL to redirect the user to the provider's authorization endpoint.
* Include the client ID, callback URI, response type (usually "code"), scopes (permissions you're requesting) and a minimum character long state parameter.

### 2. Redirect the User
Open the constructed URL in a browser.
The user will log in to Blink and approve the requested permissions.
The Blink Oauth2 server will redirect the user to your callback URL with an authorization code in the query parameters.

### 3. Receive the Authorization Code
Your application should handle the callback request.
Extract the code parameter from the query string.
  ```
  https://yourapp.com/callback?code=ory_ac_AUTHORIZATION_CODE&scope=read+receive+write&state=<your_state_parameter>
  ```

### 4. Validate the State Parameter in the Callback
Ensure that the state parameter returned in the callback matches the one you generated.

### 5. Exchange the Authorization Code for an Access Token
Make a POST request to the token endpoint with the authorization code, client ID, client secret, and redirect URI.

Example using curl:
  ```
  # set the variables
  AUTHORIZATION_CODE=
  YOUR_CALLBACK_URL=
  YOUR_CLIENT_ID=
  YOUR_CLIENT_SECRET=

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

### Examples Using the Oauth2-Token Header
Note that the Oauth2 token needs a different header for Authentication (compared to API keys using the `X-API-KEY` header or the authentication token used in the Blink mobile app):
  ```
  "Oauth2-Token" "ory_at_..."
  ```
Example header for the Blink PoS:
  ```
        headers: {
          ...(options?.token ? { ["Oauth2-Token"]: options.token } : {}),
        },
  ```
Link to the [code with the context](https://github.com/GaloyMoney/blink/pull/4149/files#diff-d5101fe657d3e5befe3ec31871012666597b3f346292241dffde4938c625090dR21).

### Example Using [next-auth](https://www.npmjs.com/package/next-auth) in the Blink PoS
```
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

Link to the [code with the context](https://github.com/GaloyMoney/blink/pull/4149/files#diff-224eae5be0d335d0d64941907106c189977dc51b2a0139459083b777efddf953R19-R70).

---

If you encounter any challenges or have questions during the integration process, don't hesitate to reach out to the Blink development team for assistance at our Mattermost server at [chat.galoy.io](https://chat.galoy.io).
