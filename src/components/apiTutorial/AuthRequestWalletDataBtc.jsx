// AuthRequestWalletDataBtc.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function AuthRequestWalletDataBtc() {
  const { authToken, apiEndpoint } = useAuth();
  const [curlCommandWallet, setCurlCommandWallet] = useState('');
  const [walletData, setWalletData] = useState(null);
  const [errorMessageFetchWallet, setErrorMessageFetchWallet] = useState(null);

  const walletCurrency = 'BTC';

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
      //const btcWallet = data?.me?.defaultAccount?.wallets?.find(wallet => wallet.walletCurrency === "BTC");

      generateCurlCommand({
        query: getWalletQuery,
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
      query: getWalletQuery,
      type: 'wallet',
      setCurlCommand: setCurlCommandWallet,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      walletCurrency: walletCurrency
    });
  }, [authToken, apiEndpoint]);

  return (
    <div>
      {/* Display for WalletData */}
      <button onClick={fetchWalletData}>Send the request</button>
      {errorMessageFetchWallet && <div style={{ color: 'red' }}>Error: {errorMessageFetchWallet}</div>}
      {walletData && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(walletData, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to get the BTC wallet ID:</div>
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
