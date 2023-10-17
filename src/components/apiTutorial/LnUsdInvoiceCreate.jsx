// lnUsdInvoiceCreate.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function LnUsdInvoiceCreate() {
  const { authToken, apiEndpoint, accountWalletId, setAccountWalletId } = useAuth();

  const [amount, setAmount] = useState(1000);

  const [curlCommandInvoice, setCurlCommandInvoice] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const [errorMessageFetchInvoice, setErrorMessageFetchInvoice] = useState(null);

  const operation = `\
mutation lnUsdInvoiceCreate($input: LnUsdInvoiceCreateInput!) {
  lnUsdInvoiceCreate(input: $input) {
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

  const fetchInvoiceData = async () => {
    const variables = {
      input: {
        amount: amount.toString(),
        walletId: accountWalletId,
      }
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, operation, variables);
      setInvoiceData(data);
      generateCurlCommand({
        operation: operation,
        type: 'invoice',
        setCurlCommand: setCurlCommandInvoice,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        amount: amount,
        accountWalletId: accountWalletId,
      });
    } catch (error) {
      setErrorMessageFetchInvoice(error.message);
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
      accountWalletId: accountWalletId,
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
        <div>
          <div style={{ fontWeight: 'bold' }}>Set the variables</div>
          <label>
            <div>Amount (USD cents):</div>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              style={{ marginLeft: '10px', width: '50%' }}
            />
          </label>
        </div>
        <label>
          <div>USD wallet ID:</div>
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
      <button onClick={fetchInvoiceData}>Create a Stablesats invoice</button>
      <div style={{ marginTop: '10px' }}></div>
      {errorMessageFetchInvoice && <div style={{ color: 'red' }}>Error: {errorMessageFetchInvoice}</div>}
      {invoiceData && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(invoiceData, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to generate a Stablesats invoice</div>
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
