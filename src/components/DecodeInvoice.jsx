import React, { useState } from 'react';
import { useAuth } from './apiTutorial/AuthContext';
import useScript from '../hooks/useScript';

export function DecodeInvoice() {
  const { paymentRequest, setPaymentRequest } = useAuth();
  const [rawData, setRawData] = useState(null);
  const [decodedInvoice, setDecodedInvoice] = useState({}); //
  const [errorMessage, setErrorMessage] = useState(null);

  const status = useScript('/js/bolt11.min.js');
  if (status === 'loading') {
    return <p>Loading script...</p>;
  }
  if (status === 'error') {
    return <p>Error loading script.</p>;
  }

  const handleDecode = () => {
    try {
      let networkName;
      let customNetwork;
      if (paymentRequest.startsWith('lnbc')) {
        networkName = "mainnet";
        customNetwork = {
          bech32: 'bc', // mainnet
          pubKeyHash: 0x42,
          scriptHash: 0xff,
          validWitnessVersions: [0, 2, 3, 4, 5]
        };
      } else if (paymentRequest.startsWith('lntbs')) {
        networkName = "signet";
        customNetwork = {
          bech32: 'tbs', // signet
          pubKeyHash: 0x42,
          scriptHash: 0xff,
          validWitnessVersions: [0, 2, 3, 4, 5]
        };
      } else if (paymentRequest.startsWith('lntb')) {
        networkName = "testnet";
        customNetwork = {
          bech32: 'tb', // testnet
          pubKeyHash: 0x42,
          scriptHash: 0xff,
          validWitnessVersions: [0, 2, 3, 4, 5]
        };
      } else {
        throw new Error('Invalid invoice prefix.');
      }

      const decoded = lightningPayReq.decode(paymentRequest, customNetwork); // Use the global object
      setRawData(decoded);

      setDecodedInvoice({
        network: networkName,
        payeeNodeKey: decoded.payeeNodeKey,
        satoshis: decoded.satoshis,
        timestampString: new Date(decoded.timestamp * 1000).toISOString(),
        link: generateLink(decoded.payeeNodeKey, networkName)
      });
      setErrorMessage(null);
    } catch (error) {
      setDecodedInvoice({});
      setErrorMessage('Failed to decode invoice. Please check the format.');
    }
  };

  const generateLink = (payeeNodeKey, network) => {
    switch (network) {
      case 'mainnet':
        return [
          `https://amboss.space/node/${payeeNodeKey}`,
          `https://mempool.space/lightning/node/${payeeNodeKey}`,
          `https://1ml.com/node/${payeeNodeKey}`
        ];
      case 'testnet':
        return [
          `https://mempool.space/${network}/lightning/node/${payeeNodeKey}`,
          `https://1ml.com/testnet/node/${payeeNodeKey}`
        ];
      case 'signet':
        return [
          `https://mempool.space/${network}/lightning/node/${payeeNodeKey}`,
        ];
      default:
        return [];
    }
  };

  const flexContainerStyle = {
    display: 'flex',
    marginBottom: '5px'
  };

  const labelStyle = {
    minWidth: '130px',
    fontWeight: 'bold'
  };

  return (
    <div>
      <textarea
        value={paymentRequest}
        onChange={(e) => setPaymentRequest(e.target.value)}
        style={{ width: '100%', height: '5em' }}
        placeholder="Paste a lightning invoice"
      />
      <button onClick={handleDecode}>Decode</button>

      <div style={{ marginTop: '10px' }}>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {rawData && (
          <div>
            {decodedInvoice && (
              <>
                <strong>Decoded Invoice Data</strong><br />
                <div style={{ marginTop: '10px' }}></div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>network:</div>
                  <div>{decodedInvoice.network}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>amount (sats):</div>
                  <div>{decodedInvoice.satoshis}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>timestamp:</div>
                  <div>{decodedInvoice.timestampString}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>payee node key:</div>
                  <div>{decodedInvoice.payeeNodeKey}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>explore:</div>
                </div>
                {generateLink(decodedInvoice.payeeNodeKey, decodedInvoice.network).map((link, index) => (
                  <div key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a><br />
                  </div>
                ))}
              </>
            )}
            <div>
              <div style={{ marginTop: '20px' }}>
                <strong>Raw Data</strong>
                <pre style={{ marginLeft: '10px', marginTop: '10px' }}>
                  {JSON.stringify(rawData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}