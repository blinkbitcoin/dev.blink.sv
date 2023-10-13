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

  const getInvoiceQueryText = `\
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

  const getInvoiceQuery = (amount, walletId) => getInvoiceQueryText

  const fetchInvoiceData = async () => {
    const query = getInvoiceQuery(amount, accountWalletId);
    const variables = {
      input: {
        amount: amount.toString(),
        walletId: accountWalletId,
      }
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, query, variables);
      setInvoiceData(data);
      generateCurlCommand({
        query: query,
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
    const query = getInvoiceQuery(amount, accountWalletId);
    generateCurlCommand({
      query: query,
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
      <h3>Generate a Stablesats invoice</h3>
      <div>Using Stablesats a merchant can generate invoices denominated in USD cents.</div>
      <div>The satoshi amount of the invoice will reflect the current USD/BTC exchange rate and the balance will be kept at the dollar value.</div>
      <div style={{ marginTop: '20px' }}></div>
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
      <div style={{ marginTop: '20px' }}></div>
      <div style={{ fontWeight: 'bold' }}>The body of the GraphQL request:</div>
      <pre style={{ marginLeft: '10px' }}>{getInvoiceQueryText}</pre>
      <button onClick={fetchInvoiceData}>Create a Stablesats invoice</button>
      {errorMessageFetchInvoice && <div style={{ color: 'red' }}>Error: {errorMessageFetchInvoice}</div>}
      {invoiceData && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(invoiceData, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to generate a Stablesats invoice:</div>
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
