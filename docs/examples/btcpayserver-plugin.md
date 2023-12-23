---
id: btcpayserver-plugin
title: BTCPayServer plugin
slug: /examples/btcpayserver-plugin
---

Use Blink as a lightning provider in [BTCPayServer](https://btcpayserver.org).<br />
Add the default wallet or select between BTC and Stablesats.

Available in BTCPayServer v1.12.0 and later.

## How to activate
* select `Manage Plugins` in the left sidebar and  install the Blink plugin:
![BTCPayServer plugin](../images/btcpayserver_plugin.png)
  restart your BTCPayServer instance.

* the option to connect to Blink will be available under the `Lightning` -> `Settings` -> `Change connection` -> `Use custom node`
![BTCPayServer plugin](../images/btcpayserver_plugin_connect.png)

* the connection script is minimum:
  ```
  type=blink;api-key=blink_...
  ```
In this case the Blink instance and the default wallet will be used.
Alternatively:
  * can specify a custom server (for development or to use an other instance of the Galoy backend)
  * can choose a wallet-id from the dashboard to use different from the default set in your Blink wallet

## Source code
[github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.Blink](https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.Blink)
