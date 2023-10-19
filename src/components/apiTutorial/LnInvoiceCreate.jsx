// LnInvoiceCreate.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function LnInvoiceCreate() {
  const { authToken, apiEndpoint, accountWalletId, setAccountWalletId } = useAuth();

  const [amount, setAmount] = useState(21);

  const [curlCommandInvoice, setCurlCommandInvoice] = useState('');
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const operation = `\
mutation LnInvoiceCreate($input: LnInvoiceCreateInput!) {
  lnInvoiceCreate(input: $input) {
    invoice {
      paymentRequest
      paymentHash
      paymentSecret
      satoshis
    }
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
        amount: amount.toString(),
        walletId: accountWalletId,
      }
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, operation, variables);
      setResponse(data);
      generateCurlCommand({
        operation: operation,
        type: 'invoice',
        setCurlCommand: setCurlCommandInvoice,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        amount: amount,
        walletId: accountWalletId,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    generateCurlCommand({
      operation: operation,
      type: 'invoice',
      setCurlCommand: setCurlCommandInvoice,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      amount: amount,
      walletId: accountWalletId,
    });
  }, [authToken, apiEndpoint, amount, accountWalletId]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWalletIdChange = (e) => {
    setAccountWalletId(e.target.value);
  };

  return (
    <div>
      <div>
        <div style={{ fontWeight: 'bold' }}>Set the variables</div>
        <div style={{ marginTop: '10px' }}></div>
        <div>
          <label>
            <div>Amount (sats):</div>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              style={{ marginLeft: '10px', width: '50%' }}
            />
          </label>
        </div>
        <label>
          <div>BTC wallet ID:</div>
          <input
            type="text"
            value={accountWalletId}
            onChange={handleWalletIdChange}
            style={{ marginLeft: '10px', width: '50%' }}
            placeholder="Paste the BTC wallet ID from the response above"
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}></div>
      <button onClick={runOp}>Create invoice</button>
      <div style={{ marginTop: '10px' }}></div>
      {errorMessage && <div style={{ color: 'red' }}>Error: {errorMessage}</div>}
      {response && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(response, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to generate an invoice</div>
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
