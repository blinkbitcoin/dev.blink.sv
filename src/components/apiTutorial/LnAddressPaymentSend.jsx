// LnAddressPaymentSend.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function LnAddressPaymentSend() {
  const { authToken, apiEndpoint, accountWalletId, setAccountWalletId,
    amount, setAmount, lnAddress, setLnAddress } = useAuth();

  const [curlCommandLnAddressPaymentSend, setCurlCommandLnAddressPaymentSend] = useState('');
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const operation = `\
  mutation LnAddressPaymentSend($input: LnAddressPaymentSendInput!) {
    lnAddressPaymentSend(input: $input) {
      status
      errors {
        code
        message
        path
      }
    }
  }`;

  const runOp = async () => {
    setErrorMessage(null);
    setResponse(null);
    const variables = {
      input: {
        amount,
        lnAddress,
        walletId: accountWalletId
      }
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, operation, variables);
      setResponse(data);
      generateCurlCommand({
        operation: operation,
        type: 'lnAddressPaymentSend',
        setCurlCommand: setCurlCommandLnAddressPaymentSend,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        walletId: accountWalletId,
        lnAddress,
        amount
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    generateCurlCommand({
      operation: operation,
      type: 'lnAddressPaymentSend',
      setCurlCommand: setCurlCommandLnAddressPaymentSend,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      walletId: accountWalletId,
      lnAddress,
      amount
    });
  }, [authToken, apiEndpoint, lnAddress, amount, accountWalletId]);

  const handleWalletIdChange = (e) => {
    setAccountWalletId(e.target.value);
  };

  return (
    <div>
      <div>
        <div style={{ fontWeight: 'bold' }}>Set the variables</div>
        <div>
          <label>
            <div>Ln Address:</div>
            <input
              type="text"
              value={lnAddress}
              onChange={e => setLnAddress(e.target.value)}
              style={{ marginLeft: '10px', width: '50%' }}
              placeholder="Ln Address"
            />
          </label>
        </div>
        <label>
            <div>Amount (Satoshis):</div>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ marginLeft: '10px', width: '50%' }}
              placeholder="Amount in Satoshis"
            />
          </label>
        <label>
          <div>Wallet ID:</div>
          <input
            type="text"
            value={accountWalletId}
            onChange={handleWalletIdChange}
            style={{ marginLeft: '10px', width: '50%' }}
            placeholder="Paste a wallet ID from the response above"
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}></div>
      <button onClick={runOp}>Send payment</button>
      <div style={{ marginTop: '10px' }}></div>
      {errorMessage && <div style={{ color: 'red' }}>Error: {errorMessage}</div>}
      {response && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(response, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to send to an ln address</div>
        <div style={{ marginTop: '10px' }}></div>
        <pre style={{
          backgroundColor: 'auto',
          padding: '10px',
          marginLeft: '10px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {curlCommandLnAddressPaymentSend}
        </pre>
      </div>

    </div>
  );
}
