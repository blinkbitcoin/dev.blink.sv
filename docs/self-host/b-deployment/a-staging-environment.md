---
id: staging-environment
title: Staging Environment
slug: /self-host/deployment/staging-environment
---

# Staging Environment

The continuous integration system of the Galoy stack is an organic part of the deployment process. All changes are first passed through and being tested in the staging environment running on signet.

More info on [testing on signet](/deployment/signet)

The endpoints are public and can be used to test the new functions or integrations before using real sats:

* API endpoint: [api.staging.blink.sv/graphql](https://api.staging.blink.sv/graphql)
* Dashboard: [dashboard.staging.blink.sv](https://dashboard.staging.blink.sv/)
* Galoy Pay endpoint with the POS app: [pay.staging.blink.sv](https://pay.staging.blink.sv/)
* POS app of the username `test`: [pay.staging.blink.sv/test](https://pay.staging.blink.sv/merchant/test)
* Printable paycode of the username `test`: [pay.staging.blink.sv/test/print](https://pay.staging.blink.sv/test/print?memo=from%20dev.galoy.io)
* The Bitcoin Beach Wallet app can be connected to the staging environment if you tap 3 times on the build number in settings or the Blink the logo before login.
* the backing lightning nodes:
  * [03bb03bb6e389355834c9fc7dfeb849dab17d9940d955f6dba0c27e84c88ca4ab8](https://mempool.space/signet/lightning/node/03bb03bb6e389355834c9fc7dfeb849dab17d9940d955f6dba0c27e84c88ca4ab8)
  * [024e679c1a77143029b806f396f935fa6cd0744970f412667adfc75edbbab54d7a](https://mempool.space/signet/lightning/node/024e679c1a77143029b806f396f935fa6cd0744970f412667adfc75edbbab54d7a)

