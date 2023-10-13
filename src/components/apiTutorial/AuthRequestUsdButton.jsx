// AuthRequestUsdButton.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export default function AuthRequestUsdButton() {
  const { authToken, apiEndpoint, accountWalletId, setAccountWalletId,
    paymentRequest, setPaymentRequest } = useAuth();

  const [amount, setAmount] = useState(1000);

  const [curlCommandFeeProbe, setCurlCommandFeeProbe] = useState('');
  const [feeProbeData, setFeeProbeData] = useState(null);
  const [errorMessageFetchFeeProbe, setErrorMessageFetchFeeProbe] = useState(null);

  const [curlCommandLnInvoicePayment, setCurlCommandLnInvoicePayment] = useState('');
  const [lnInvoicePaymentData, setLnInvoicePaymentData] = useState(null);
  const [errorMessageLnInvoicePayment, setErrorMessageLnInvoicePayment] = useState(null);

  const getFeeProbeQueryText = `\
mutation lnUsdInvoiceFeeProbe($input: LnUsdInvoiceFeeProbeInput!) {
  lnUsdInvoiceFeeProbe(input: $input) {
    errors {
      message
    }
    amount
  }
}`;
  const getFeeProbeQuery = (paymentRequest, walletId) => getFeeProbeQueryText

  const getInvoiceSendQueryText = `\
mutation LnInvoicePaymentSend($input: LnInvoicePaymentInput!) {
  lnInvoicePaymentSend(input: $input) {
    status
    errors {
      message
      path
      code
    }
  }
}`;
  const getInvoiceSendQuery = (paymentRequest, walletId) => getInvoiceSendQueryText

  const fetchLnInvoicePaymentData = async () => {
    const query = getInvoiceSendQuery(paymentRequest, accountWalletId);
    const variables = {
      input: {
        paymentRequest: paymentRequest,
        walletId: accountWalletId
      }
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, query, variables);
      setLnInvoicePaymentData(data);
      generateCurlCommand({
        query: query,
        type: 'lnInvoicePaymentSend',
        setCurlCommand: setCurlCommandLnInvoicePayment,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        amount: amount,
        accountWalletId: accountWalletId,
        paymentRequest: paymentRequest
      });
    } catch (error) {
      setErrorMessageLnInvoicePayment(error.message);
    }
  };

  const fetchFeeProbeData = async () => {
    const query = getFeeProbeQuery(paymentRequest, accountWalletId);
    const variables = {
      input: {
        paymentRequest: paymentRequest,
        walletId: accountWalletId,
      }
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, query, variables);
      setFeeProbeData(data);
      generateCurlCommand({
        query: query,
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
    const query = getFeeProbeQuery(paymentRequest, accountWalletId);
    generateCurlCommand({
      query: query,
      type: 'feeProbe',
      setCurlCommand: setCurlCommandFeeProbe,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      amount: amount,
      accountWalletId: accountWalletId,
      paymentRequest: paymentRequest,
    });
  }, [authToken, apiEndpoint, paymentRequest, accountWalletId]);

  useEffect(() => {
    const query = getInvoiceSendQuery(paymentRequest, accountWalletId);
    generateCurlCommand({
      query: query,
      type: 'lnInvoicePaymentSend',
      setCurlCommand: setCurlCommandLnInvoicePayment,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      amount: amount,
      accountWalletId: accountWalletId,
      paymentRequest: paymentRequest,
    });
  }, [authToken, apiEndpoint, paymentRequest, accountWalletId]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWalletIdChange = (e) => {
    setAccountWalletId(e.target.value);
  };

  return (
    <div>
      {/* Display for FeeProbe */}
      <h3>Probe invoice fee</h3>
      <div>Estimate the cost of paying a lightning invoice.</div>
      <div>Payments to an other Blink user and to nodes with a direct channel are free.</div>
      <div style={{ marginTop: '20px' }}></div>
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
      <pre style={{ marginLeft: '10px' }}>{getFeeProbeQueryText}</pre>
      <button onClick={fetchFeeProbeData}>Probe fee</button>
      {errorMessageFetchFeeProbe && <div style={{ color: 'red' }}>Error: {errorMessageFetchFeeProbe}</div>}
      {feeProbeData && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(feeProbeData, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <h4>cURL command to probe invoice fee:</h4>
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

      {/* Display for invoiceSend */}
      <h3>Pay an invoice</h3>
      <div>Pay a BOLT11 invoice from your Stablesats balance</div>
      <div style={{ marginTop: '20px' }}></div>
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
      <pre style={{ marginLeft: '10px' }}>{getInvoiceSendQueryText}</pre>
      <button onClick={fetchLnInvoicePaymentData}>Send payment</button>
      {errorMessageLnInvoicePayment && <div style={{ color: 'red' }}>Error: {errorMessageLnInvoicePayment}</div>}
      {lnInvoicePaymentData && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(lnInvoicePaymentData, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to pay an invoice:</div>
        <pre style={{
          backgroundColor: 'auto',
          padding: '10px',
          marginLeft: '10px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {curlCommandLnInvoicePayment}
        </pre>
      </div>

    </div>
  );
}
