// LnInvoiceCreate.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function LnInvoiceFeeProbe() {
  const { authToken, apiEndpoint, accountWalletId, setAccountWalletId,
    paymentRequest, setPaymentRequest } = useAuth();

  const [amount, setAmount] = useState(1000);

  const [curlCommandFeeProbe, setCurlCommandFeeProbe] = useState('');
  const [feeProbeData, setFeeProbeData] = useState(null);
  const [errorMessageFetchFeeProbe, setErrorMessageFetchFeeProbe] = useState(null);

  const operation = `\
mutation lnInvoiceFeeProbe($input: LnInvoiceFeeProbeInput!) {
  lnInvoiceFeeProbe(input: $input) {
    errors {
      message
    }
    amount
  }
}`;

  const fetchFeeProbeData = async () => {
    const variables = {
      input: {
        paymentRequest: paymentRequest,
        walletId: accountWalletId,
      }
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, operation, variables);
      setFeeProbeData(data);
      generateCurlCommand({
        operation: operation,
        type: 'feeProbe',
        setCurlCommand: setCurlCommandFeeProbe,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        amount: amount,
        accountWalletId: accountWalletId,
        paymentRequest: paymentRequest
      });
    } catch (error) {
      setErrorMessageFetchFeeProbe(error.message);
    }
  };

  useEffect(() => {
    generateCurlCommand({
      operation: operation,
      type: 'feeProbe',
      setCurlCommand: setCurlCommandFeeProbe,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      amount: amount,
      accountWalletId: accountWalletId,
      paymentRequest: paymentRequest,
    });
  }, [authToken, apiEndpoint, paymentRequest, accountWalletId]);

  const handleWalletIdChange = (e) => {
    setAccountWalletId(e.target.value);
  };

  return (
    <div>
      <div>
        <div style={{ fontWeight: 'bold' }}>Set the variables</div>
        <div>
          <label>
            <div>Invoice</div>
            <input
              type="text"
              value={paymentRequest}
              onChange={e => setPaymentRequest(e.target.value)}
              style={{ marginLeft: '10px', width: '50%' }}
              placeholder="Paste a lightning invoice"
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
      <button onClick={fetchFeeProbeData}>Probe fee</button>
      <div style={{ marginTop: '10px' }}></div>
      {errorMessageFetchFeeProbe && <div style={{ color: 'red' }}>Error: {errorMessageFetchFeeProbe}</div>}
      {feeProbeData && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(feeProbeData, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <h4>curl command to probe invoice fee</h4>
        <div style={{ marginTop: '10px' }}></div>
        <pre style={{
          backgroundColor: 'auto',
          padding: '10px',
          marginLeft: '10px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {curlCommandFeeProbe}
        </pre>
      </div>
    </div>
  );
}
