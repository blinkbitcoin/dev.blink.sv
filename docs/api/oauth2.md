---
id: oauth2
title: OAuth2 integration
slug: /api/oauth2
---

# OAuth2 integration guide
The OAuth2 interation in Blink empowers third-party applications to authenticate and interact with the Blink backend services seamlessly. By leveraging [Ory Hydra](https://github.com/ory/hydra), an OAuth 2.0 and OpenID Connect server, applications can obtain secure access to the Blink API, enabling functionalities such as data access and transaction management within the Blink ecosystem.

## Getting started
Before integrating with Blink OAuth2, it's crucial to have a foundational understanding of [OAuth 2.0](https://www.ory.sh/docs/oauth2-oidc/overview/oauth2-concepts) and [OpenID Connect (OIDC)](https://www.ory.sh/docs/oauth2-oidc/overview/oidc-concepts). These protocols facilitate secure authorization workflows between your application and Blink services, allowing for authenticated access to user-specific data and actions.

## Register your application
To initiate the integration process, your application must be registered and approved by Blink's development team. This is a critical step to ensure secure and authorized access to Blink's API functionalities.

### Application approval
Reach out to the Blink development team via our Mattermost server at [chat.galoy.io](https://chat.galoy.io) to start the approval process for using OAuth2. You'll need to provide details about your application, including its purpose and the scopes of access required.

### Callback URL
Specify the callback URL for your application. This URL is where users will be redirected after successful authentication, facilitating the completion of the OAuth2 flow.

### Configuration examples
Below are the Terraform configurations for two existing Blink integrations, showcasing how to set up OAuth2 clients for different applications using the [hydra_oauth2_client Terraform resource](https://registry.terraform.io/providers/svrakitin/hydra/latest/docs/resources/oauth2_client) :

#### Blink Dashboard at [dashboard.blink.sv](https://dashboard.blink.sv)
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
#### Blink PoS at [pay.blink.sv](https://pay.blink.sv)
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

If you encounter any challenges or have questions during the integration process, don't hesitate to reach out to the Blink development team for assistance.
