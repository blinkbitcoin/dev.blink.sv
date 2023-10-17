// GetWalletDataUsd.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function GetWalletDataUsd() {
  const { authToken, apiEndpoint } = useAuth();
  const [curlCommandWallet, setCurlCommandWallet] = useState('');
  const [walletData, setWalletData] = useState(null);
  const [errorMessageFetchWallet, setErrorMessageFetchWallet] = useState(null);

  const walletCurrency = 'USD';

  const getWalletQuery = `\
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

  const fetchWalletData = async () => {
    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, getWalletQuery);
      setWalletData(data);

      //TODO: add to context
      //const usdWallet = data?.me?.defaultAccount?.wallets?.find(wallet => wallet.walletCurrency === "USD");

      generateCurlCommand({
        operation: getWalletQuery,
        type: 'wallet',
        setCurlCommand: setCurlCommandWallet,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        walletCurrency: walletCurrency
      });
    } catch (error) {
      setErrorMessageFetchWallet(error.message);
    }
  };

  useEffect(() => {
    generateCurlCommand({
      operation: getWalletQuery,
      type: 'wallet',
      setCurlCommand: setCurlCommandWallet,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      walletCurrency: walletCurrency
    });
  }, [authToken, apiEndpoint]);

  return (
    <div>
      <button onClick={fetchWalletData}>Send the request</button>
      <div style={{ marginTop: '10px' }}></div>
      {errorMessageFetchWallet && <div style={{ color: 'red' }}>Error: {errorMessageFetchWallet}</div>}
      {walletData && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(walletData, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to get the USD wallet ID</div>
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
