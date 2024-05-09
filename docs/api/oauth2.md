---
id: oauth2
title: OAuth2 integration
slug: /api/oauth2
---

# OAuth2 integration guide
The OAuth2 integration in Blink empowers third-party applications to authenticate and interact with the Blink backend services seamlessly. By leveraging [Ory Hydra](https://github.com/ory/hydra), an OAuth 2.0 and OpenID Connect server, applications can obtain secure access to the Blink API, enabling functionalities such as data access and transaction management within the Blink ecosystem.

## Getting started
Before integrating with Blink OAuth2, it's crucial to have a foundational understanding of [OAuth 2.0](https://www.ory.sh/docs/oauth2-oidc/overview/oauth2-concepts) and [OpenID Connect (OIDC)](https://www.ory.sh/docs/oauth2-oidc/overview/oidc-concepts). These protocols facilitate secure authorization workflows between your application and Blink services, allowing for authenticated access to user-specific data and actions.
The connecting applications are using the [OAuth2 authorization code flow](https://www.ory.sh/docs/oauth2-oidc/authorization-code-flow).

## Register your application
To initiate the integration process, your application must be registered and approved by Blink's development team. This is a critical step to ensure secure and authorized access to Blink's API functionalities.

### Application approval
Reach out to the Blink development team via our Mattermost server at [chat.galoy.io](https://chat.galoy.io) to start the approval process for using OAuth2. You'll need to provide details about your application, including its purpose and the scopes of access required.

### Callback URL
Specify the callback URL for your application. This URL is where users will be redirected after successful authentication, facilitating the completion of the OAuth2 flow.

### Oauth2 authorization token
After the approval you will be provided an Oauth2 authorization token which will be needed in the [Oauth2-Token header](#using-the-oauth2-token-header)

### Client ID and secret
After the registration you will receive a client ID and a client secret from our server. These are unique identifiers that allow the Blink API backend to identify your application and allow it to access protected resources. The client ID is considered public information and can be included in JavaScript source code or used to build login URLs. The client secret, however, must be kept confidential and is used to authenticate the client to the authorization server.

## Configuration examples
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

## Implementing OAuth2 in your application
After your application is approved, you'll need to implement the OAuth2 flow. This involves setting up your application to redirect users to the Blink authentication service, handle the redirect back with an authorization code, and exchange that code for an access token.

For a hands-on introduction to setting up OAuth2 with Ory Hydra, you can explore this [5-minute tutorial](https://www.ory.sh/docs/hydra/5min-tutorial).

### Using the Oauth2-Token header
Note that the Oauth2 token needs a different header for Authentication (compared to API keys using the `X-API-KEY` header or the authentication token used in the Blink mobile app).
Example header for the Blink PoS:
```
      headers: {
        ...(options?.token ? { ["Oauth2-Token"]: options.token } : {}),
      },
```
Link to the [code with the context](https://github.com/GaloyMoney/blink/pull/4149/files#diff-d5101fe657d3e5befe3ec31871012666597b3f346292241dffde4938c625090dR21).

### Example using [next-auth](https://www.npmjs.com/package/next-auth) in the Blink PoS
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
