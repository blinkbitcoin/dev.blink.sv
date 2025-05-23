---
id: blink-pay
title: Blink Pay
slug: /self-host/deployment/blink-pay
---

# Blink Pay

Blink Pay is a web based PoS app.

See the [readme](https://github.com/blinkbitcoin/blink/tree/main/apps/pay#readme) inside the Blink monorepo for the latest info.

It's packaged as a docker image, and is automatically installed as part of the Blink helm charts.

With a default installation, Blink-Pay can be accessed under `pay.domain.com`.

Blink-Pay uses query, mutation, and subscription operations from the Blink's graphql API endpoints `api.domain.com` as defined in [schema.graphql](https://github.com/blinkbitcoin/blink/blob/main/src/graphql/main/schema.graphql)

### How to run this repo locally?

In the project directory, create a file name `.env.local` and fill it with

```
NEXT_PUBLIC_GRAPHQL_HOSTNAME='api.staging.blink.sv'
```

(or use your custom API URL), then run

```
yarn install
yarn dev
```

This will run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

The page will automatically reload when you make edits.

You will also see any lint errors in the console.

#### How to build for production?

In the project directory, you can run:

```
yarn install
yarn build
```

This will build the app for production under a `build` folder. It will bundle React in production mode and optimize the build for the best performance. The build will be minified, and the bundled files will include unique hashes in their names.
