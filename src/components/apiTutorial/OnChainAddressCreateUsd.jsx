// OnChainAddressCreateUsd.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function OnChainAddressCreateUsd() {
  const { authToken, apiEndpoint, accountWalletId, setAccountWalletId } = useAuth();

  const [curlCommandInvoice, setCurlCommandInvoice] = useState('');
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const operation = `\
mutation onChainAddressCreate($input: OnChainAddressCreateInput!) {
  onChainAddressCreate(input: $input) {
    address
    errors {
      message
    }
  }
}`;

  const runOp = async () => {
    setErrorMessage(null);
    setResponse(null);
    const variables = {
      input: {
        walletId: accountWalletId,
      }
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, operation, variables);
      setResponse(data);
      generateCurlCommand({
        operation: operation,
        setCurlCommand: setCurlCommandInvoice,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        walletId: accountWalletId,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    generateCurlCommand({
      operation: operation,
      setCurlCommand: setCurlCommandInvoice,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      walletId: accountWalletId,
    });
  }, [authToken, apiEndpoint, accountWalletId]);

  const handleWalletIdChange = (e) => {
    setAccountWalletId(e.target.value);
  };

  return (
    <div>
      <div>
        <div style={{ fontWeight: 'bold' }}>Set the USD wallet ID:</div>
        <label>
          <input
            type="text"
            value={accountWalletId}
            onChange={handleWalletIdChange}
            style={{ marginLeft: '10px', width: '50%' }}
            placeholder="Paste the USD wallet ID from the response above"
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}></div>
      <button onClick={runOp}>Create a new address</button>
      <div style={{ marginTop: '10px' }}></div>
      {errorMessage && <div style={{ color: 'red' }}>Error: {errorMessage}</div>}
      {response && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(response, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to generate a new address</div>
        <div style={{ marginTop: '10px' }}></div>
        <pre style={{
          backgroundColor: 'auto',
          padding: '10px',
          marginLeft: '10px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {curlCommandInvoice}
        </pre>
      </div>
    </div>
  );
}
