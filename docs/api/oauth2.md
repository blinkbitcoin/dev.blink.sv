---
id: oauth2
title: OAuth2 integration
slug: /api/oauth2
---

# OAuth2 integration
[OAuth2](https://oauth.net/2/) is integrated in the API using [Ory Hydra](https://www.ory.sh/hydra/).

It is configured to accept login requests through the [Blink Dashboard](https://dashboard.blink.sv).

Account creation purely through the API is currently not allowed.

## Adding a new application
* A new application to use the OAuth2 flow needs to be manually approved to be able to generate a `login_challenge` through Hydra
* the callback address where the user will be redirected to after login needs to be defined.

Please contact the dev team on [chat.galoy.io](https://chat.galoy.io) to use OAuth2 to integrate an external app with the Blink API.

## More details
* See the [readme of the Consent app](https://github.com/GaloyMoney/galoy/tree/main/apps/consent#readme)
