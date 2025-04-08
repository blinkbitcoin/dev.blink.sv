---
id: authentication-examples
title: API Authentication Examples
slug: /api/authentication-examples
---

# API Authentication Examples

This guide provides comprehensive examples of how to authenticate with the Blink API using the `X-API-KEY` header across different programming languages and tools.

## Authentication Header

All authenticated API requests to Blink require the `X-API-KEY` header with your API key:

```
X-API-KEY: blink_your_api_key_here
```

## Getting Your API Key

1. Log in to the [Blink Dashboard](https://dashboard.blink.sv)
2. Navigate to the API Keys section in the left menu
3. Create a new API key with the appropriate scopes
4. Copy and securely store your API key

## Authentication Examples

### cURL

```bash
curl --request POST \
  --url 'https://api.blink.sv/graphql' \
  --header 'Content-Type: application/json' \
  --header 'X-API-KEY: blink_your_api_key_here' \
  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}"}' 
```

### JavaScript (Fetch API)

```javascript
const fetchWalletData = async (apiKey) => {
  try {
    const response = await fetch('https://api.blink.sv/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      },
      body: JSON.stringify({
        query: `
          query me {
            me {
              defaultAccount {
                wallets {
                  id
                  walletCurrency
                }
              }
            }
          }
        `
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }
};
```

### Python (Requests)

```python
import requests

def get_wallet_data(api_key):
    url = "https://api.blink.sv/graphql"
    
    headers = {
        "Content-Type": "application/json",
        "X-API-KEY": api_key
    }
    
    query = """
    query me {
      me {
        defaultAccount {
          wallets {
            id
            walletCurrency
          }
        }
      }
    }
    """
    
    payload = {"query": query}
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Query failed with status code {response.status_code}: {response.text}")
```

### Node.js (Axios)

```javascript
const axios = require('axios');

async function getWalletData(apiKey) {
  try {
    const response = await axios({
      url: 'https://api.blink.sv/graphql',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      },
      data: {
        query: `
          query me {
            me {
              defaultAccount {
                wallets {
                  id
                  walletCurrency
                }
              }
            }
          }
        `
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }
}
```

### WebSocket Connection

For WebSocket connections, the API key is included in the connection initialization payload:

```javascript
// Using a WebSocket client
const ws = new WebSocket('wss://ws.blink.sv/graphql', 'graphql-transport-ws');

// Connection initialization with API key
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'connection_init',
    payload: {
      'X-API-KEY': 'blink_your_api_key_here'
    }
  }));
};

// Handle connection acknowledgment
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  if (message.type === 'connection_ack') {
    console.log('Connection established successfully');
    
    // Subscribe to updates after connection is established
    ws.send(JSON.stringify({
      id: '1',
      type: 'subscribe',
      payload: {
        query: `
          subscription {
            myUpdates {
              update {
                ... on LnUpdate {
                  transaction {
                    initiationVia {
                      ... on InitiationViaLn {
                        paymentHash
                      }
                    }
                    direction
                  }
                }
              }
            }
          }
        `
      }
    }));
  }
};
```

## Authentication with Postman

1. Create a new request to `https://api.blink.sv/graphql`
2. Set the method to `POST`
3. In the Headers tab, add:
   - `Content-Type: application/json`
   - `X-API-KEY: blink_your_api_key_here`
4. In the Body tab, select "raw" and "JSON", then enter your GraphQL query:
   ```json
   {
     "query": "query me { me { defaultAccount { wallets { id walletCurrency }}}}"
   }
   ```

## Common Authentication Issues

### Invalid API Key Format

Ensure your API key starts with `blink_` and is correctly copied from the dashboard.

### Missing or Incorrect Header

The header name must be exactly `X-API-KEY` (case-sensitive).

### Expired or Revoked API Key

If your API key has been revoked or expired, you'll need to generate a new one from the dashboard.

### Insufficient Permissions

Make sure your API key has the appropriate scopes for the operations you're trying to perform:
- `Read` for queries
- `Receive` for creating invoices
- `Write` for sending payments and modifying data

## Security Best Practices

1. **Never expose your API key in client-side code** that will be visible to users
2. **Store API keys securely** in environment variables or secure key management systems
3. **Use the minimum required scopes** for your application
4. **Rotate API keys periodically** for enhanced security
5. **Revoke unused API keys** from the dashboard
