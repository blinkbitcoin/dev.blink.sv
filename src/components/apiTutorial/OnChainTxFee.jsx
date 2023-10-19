// OnChainTxFee.jsx
import React, { useState, useEffect } from 'react';
import { handleAuthenticatedRequest } from './authRequests';
import { useAuth } from './AuthContext';
import { generateCurlCommand } from './curlCommandGenerators';

export function OnChainTxFee() {
  const { authToken, apiEndpoint, accountWalletId, setAccountWalletId } = useAuth();
  const [address, setAddress] = useState();

  const [amount, setAmount] = useState(546);

  const [curlCommand, setCurlCommand] = useState('');
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const operation = `\
query onChainTxFee($walletId: WalletId!, $address: OnChainAddress!, $amount: SatAmount!) {
  onChainTxFee(walletId: $walletId, address: $address, amount: $amount) {
    amount
  }
}`;

  const runOp = async () => {
    setErrorMessage(null);
    setResponse(null);
    const variables = {
      walletId: accountWalletId,
      address: address,
      amount: amount
    };

    try {
      const data = await handleAuthenticatedRequest(authToken, apiEndpoint, operation, variables);
      setResponse(data);
      generateCurlCommand({
        operation: operation,
        type: 'onChainTxFee',
        setCurlCommand: setCurlCommand,
        authToken: authToken,
        apiEndpoint: apiEndpoint,
        walletId: accountWalletId,
        address: address,
        amount: amount
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    generateCurlCommand({
      operation: operation,
      type: 'onChainTxFee',
      setCurlCommand: setCurlCommand,
      authToken: authToken,
      apiEndpoint: apiEndpoint,
      walletId: accountWalletId,
      address: address,
      amount: amount
    });
  }, [authToken, apiEndpoint, accountWalletId, amount, address]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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
        <div>
          <label>
            <div>Onchain address:</div>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
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
            placeholder="Paste the USD wallet ID from the response above"
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}></div>
      <button onClick={runOp}>Estimate the transaction fee</button>
      <div style={{ marginTop: '10px' }}></div>
      {errorMessage && <div style={{ color: 'red' }}>Error: {errorMessage}</div>}
      {response && <div><strong>Response:</strong> <pre style={{ marginLeft: '10px' }}>{JSON.stringify(response, null, 2)}</pre></div>}

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ fontWeight: 'bold' }}>curl command to estimate the transaction fee</div>
        <div style={{ marginTop: '10px' }}></div>
        <pre style={{
          backgroundColor: 'auto',
          padding: '10px',
          marginLeft: '10px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {curlCommand}
        </pre>
      </div>
    </div>
  );
}
