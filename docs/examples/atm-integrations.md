---
id: atm-integrations
title: ATM Integrations
slug: /examples/atm-integrations
---

## Lamassu
A Blink account can be used as the lightning funding source of a [Lamassu ATM](https://lamassu.is/).

<img src="/img/atm_lamassu.png" alt="Lamassu ATM" width="800"/>

* Source code:<br />
  https://github.com/RafaelTaranto/lamassu-server/blob/8e1aa4fd6333fdfccea26e3b0d32c9c8a7c8a0b5/lib/plugins/wallet/galoy/galoy.js

## K1 Mini ATM
* Project website: [k1.sv](https://k1.sv)

<img src="/img/atm_k1.png" alt="K1 Mini ATM" width="800"/>

## Lightning ATM
A Blink account can be used as the lightning enabled bitcoin funding source for the DIY [Lightning ATM project](https://github.com/21isenough/LightningATM#lightningatm).

Depending on setting the BTC or USD walletID in the ATM configuration, it will pay out from either the BTC or the Stablesats balance.

<img src="/img/lightning_atm.jpeg" alt="The Lightning ATM" width="800"/>

* Setup instructions:<br />
  https://github.com/21isenough/LightningATM/blob/master/docs/guide/set_up_a_blink_wallet.md

* Implementation details:<br />
  https://github.com/21isenough/LightningATM/blob/master/blink.py

* First demo:<br />
  https://twitter.com/openoms/status/1721618229640982890
