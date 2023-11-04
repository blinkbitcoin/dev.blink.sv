// GetWalletDataBtc.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function GetWalletDataBtc() {
  const { authToken, apiEndpoint } = useAuth();

  const [curlCommandWallet, setCurlCommandWallet] = useState('');
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const walletCurrency = 'BTC';

  const operation = `\
  query Me {
    me {
      defaultAccount {
        wallets {
          id
          walletCurrency
          balance
        }
      }
    }
  }`;

  const runOp = async () => {
    setErrorMessage(null);
    setResponse(null);
    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, operation);
      setResponse(data);

      //TODO: add to context
      //const btcWallet = data?.me?.defaultAccount?.wallets?.find(wallet => wallet.walletCurrency === "BTC");

      generateCurlCommand({
        operation: operation,
        type: 'wallet',
        setCurlCommand: setCurlCommandWallet,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        walletCurrency: walletCurrency
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    generateCurlCommand({
      operation: operation,
      type: 'wallet',
      setCurlCommand: setCurlCommandWallet,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      walletCurrency: walletCurrency
    });
  }, [authToken, apiEndpoint]);

  return (
    <div>
      <button onClick={runOp}>Send the request</button>
      <div style={{ marginTop: '10px' }}></div>
      {errorMessage && <div style={{ color: 'red' }}>Error: {errorMessage}</div>}
      {response && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(response, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to get the BTC wallet ID</div>
        <div style={{ marginTop: '10px' }}></div>
        <pre style={{
          backgroundColor: 'auto',
          padding: '10px',
          marginLeft: '10px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {curlCommandWallet}
        </pre>
      </div>
    </div>
  );
}
