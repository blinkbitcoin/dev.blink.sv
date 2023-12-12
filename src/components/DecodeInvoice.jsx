import React, { useState, useEffect } from 'react';
import useScript from '../hooks/useScript';

export function DecodeInvoice() {
  const [paymentRequestFromUrl, setPaymentRequestFromUrl] = useState('');
  const [paymentRequest, setPaymentRequest] = useState('');
  const [rawData, setRawData] = useState(null);
  const [decodedInvoice, setDecodedInvoice] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState('');
  const [showRawData, setShowRawData] = useState(false);

  useEffect(() => {
    // This code runs after component mount, window is available here
    const urlParams = new URLSearchParams(window.location.search);
    const paymentRequestFromUrl = urlParams.get('invoice') || '';
    setPaymentRequestFromUrl(paymentRequestFromUrl);
  }, []);

  const status = useScript('/js/bolt11.min.js');
  if (status === 'loading') {
    return <p>Loading script...</p>;
  }
  if (status === 'error') {
    return <p>Error loading script.</p>;
  }

  const findTagData = (tagName) => {
    const tag = rawData?.tags?.find(t => t.tagName === tagName);
    return tag ? tag.data : '';
  };

  const handleDecode = (invoice) => {
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

      const decoded = lightningPayReq.decode(paymentRequest, customNetwork);
      setRawData(decoded);

      // Format timestamp to exclude milliseconds
      const timestamp = new Date(decoded.timestamp * 1000);
      const timestampString = timestamp.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, 'Z');

      // Calculate expiration status
      const expireTime = decoded.tags.find((tag) => tag.tagName === 'expire_time')?.data;
      let expirationStatus;
      if (expireTime) {
        const expirationDate = new Date(timestamp.getTime() + expireTime * 1000);
        const now = new Date();
        if (expirationDate < now) {
          const expiredSinceMinutes = Math.round((now - expirationDate) / 60000);
          expirationStatus = `expired since ${expiredSinceMinutes} minutes`;
        } else {
          const expiryInMinutes = Math.round(expireTime / 60);
          const minutesLeft = Math.round((expirationDate - now) / 60000);
          expirationStatus = `${minutesLeft} minutes remaining out of ${expiryInMinutes}`;
        }
      } else {
        expirationStatus = 'N/A';
      }

      setDecodedInvoice({
        invoice: decoded.paymentRequest,
        network: networkName,
        payeeNodeKey: decoded.payeeNodeKey,
        satoshis: decoded.satoshis,
        timestampString,
        expirationStatus,
        link: generateLink(decoded.payeeNodeKey, networkName)
      });
      setErrorMessage(null);
    } catch (error) {
      setDecodedInvoice({});
      setErrorMessage('Failed to decode invoice. Please check the format.');
    }
  };

  const generateLink = (payeeNodeKey, network) => {
    const links = {
      mainnet: [
        { url: `https://amboss.space/node/${payeeNodeKey}`, name: 'amboss.space' },
        { url: `https://mempool.space/lightning/node/${payeeNodeKey}`, name: 'mempool.space' },
        { url: `https://1ml.com/node/${payeeNodeKey}`, name: '1ml.com' }
      ],
      testnet: [
        { url: `https://mempool.space/${network}/lightning/node/${payeeNodeKey}`, name: 'mempool.space/testnet' },
        { url: `https://1ml.com/testnet/node/${payeeNodeKey}`, name: '1ml.com/testnet' }
      ],
      signet: [
        { url: `https://mempool.space/${network}/lightning/node/${payeeNodeKey}`, name: 'mempool.space/signet' }
      ]
    };
    return links[network] || [];
  };

  const flexContainerStyle = {
    display: 'flex',
    marginBottom: '5px'
  };

  const labelStyle = {
    minWidth: '130px',
    fontWeight: 'bold'
  };

  if (paymentRequestFromUrl && !rawData) {
    const decodeInvoice = (invoice) => {
      // Set the payment request and then decode
      setPaymentRequest(invoice);
      handleDecode(invoice);
    };
    decodeInvoice(paymentRequestFromUrl);
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification('copied to clipboard');
      setTimeout(() => {
        setNotification('');
      }, 2000); // Notification disappears after 2 seconds
    }, (err) => {
      console.error('Could not copy text: ', err);
      setNotification('Failed to copy to clipboard.');
      setTimeout(() => {
        setNotification('');
      }, 2000);
    });
  };

  const toggleRawData = () => {
    setShowRawData(!showRawData);
  };

  const clearData = () => {
    setPaymentRequest('');
    setRawData(null);
    setDecodedInvoice({});
    setErrorMessage(null);
    setShowRawData(false);
    setPaymentRequestFromUrl('');
  };

  return (
    <div>

      {paymentRequestFromUrl === '' && (
        <div>
          <textarea
            value={paymentRequest}
            onChange={(e) => setPaymentRequest(e.target.value)}
            style={{ width: '100%', height: '5em' }}
            placeholder="Paste a lightning invoice"
          />
          <button onClick={handleDecode}>Decode</button>
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {rawData && (
          <div>
            {decodedInvoice && (
              <>
                <h3>Data</h3>
                <div style={{ marginTop: '10px' }}></div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>network:</div>
                  <div>{decodedInvoice.network}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>amount:</div>
                  <div>{decodedInvoice.satoshis} sats</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>description:</div>
                  <div>{findTagData('description')}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>expiry:</div>
                  <div>{decodedInvoice.expirationStatus}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>created at:</div>
                  <div>{decodedInvoice.timestampString}</div>
                </div>
                <div style={labelStyle}>payee node key:</div>
                <div style={flexContainerStyle}>
                  <div
                    style={{
                      width: "100%",
                      cursor: 'pointer',
                    }}
                    onClick={() => copyToClipboard(decodedInvoice.payeeNodeKey)}
                    title="Click to copy"
                  >
                    {decodedInvoice.payeeNodeKey}
                  </div>
                </div>

                <div style={flexContainerStyle}>
                  <div style={labelStyle}>explore:</div>
                </div>
                {generateLink(decodedInvoice.payeeNodeKey, decodedInvoice.network).map((link, index) => (
                  <div key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a><br />
                  </div>
                ))}
              </>
            )}

            <div style={labelStyle}>invoice:</div>
            <div style={flexContainerStyle}>
              <div
                style={{
                  width: "100%",
                  cursor: 'pointer',
                }}
                onClick={() => copyToClipboard(decodedInvoice.invoice)}
                title="Click to copy"
              >
                {decodedInvoice.invoice}
              </div>
            </div>
            {/* Notification Bubble */}
            {notification && (
              <div style={{
                position: 'fixed',
                top: '20px',       // Position at the top
                left: '50%',       // Center horizontally
                transform: 'translateX(-50%)', // Adjust for exact centering
                backgroundColor: 'orange',
                color: 'black',    // Black text color
                padding: '10px',
                borderRadius: '10px',
                zIndex: 1000,      // Ensure it's above other elements
              }}>
                {notification}
              </div>
            )}
            <div>

              <div style={{ marginTop: '20px' }}>
                {/* Button to toggle raw data */}
                <button onClick={toggleRawData}>
                  {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
                </button>

                {/* Conditionally rendered Raw Data section */}
                {showRawData && (
                  <div style={{ marginTop: '20px' }}>
                    <h3>Raw Data</h3>
                    <pre style={{ marginLeft: '10px', marginTop: '10px' }}>
                      {JSON.stringify(rawData, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Button to clear data and decode new invoice */}
                <div style={{ marginTop: '20px' }}>
                  <button onClick={clearData}>Clear</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}