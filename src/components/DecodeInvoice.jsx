import React, { useState, useEffect } from 'react';
import useScript from '../hooks/useScript';

export function DecodeInvoice() {
  const [invoiceFromUrl, setInvoiceFromUrl] = useState('');
  const [paymentRequest, setPaymentRequest] = useState('');
  const [rawData, setRawData] = useState(null);
  const [rawNodeData, setRawNodeData] = useState(null);
  const [decodedInvoice, setDecodedInvoice] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState('');
  const [showRawData, setShowRawData] = useState(false);
  const [decodingSuccessful, setDecodingSuccessful] = useState(true);

  useEffect(() => {
    // This code runs after component mount, window is available here
    const urlParams = new URLSearchParams(window.location.search);
    const invoiceParam = urlParams.get('invoice') || '';
    setInvoiceFromUrl(invoiceParam);
  }, []);

  useEffect(() => {
    if (paymentRequest) {
      if (invoiceFromUrl !== '' && paymentRequest) {
        decodeInvoice(paymentRequest);
      }
    }
  }, [paymentRequest]);

  const status = useScript('/js/bolt11.min.js');
  if (status === 'loading') {
    return <p>Loading script...</p>;
  }
  if (status === 'error') {
    return <p>Error loading script.</p>;
  }

  const decodeInvoice = () => {
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
      }

      let decoded;
      try {
        decoded = lightningPayReq.decode(paymentRequest, customNetwork);

        setRawData(decoded);

        const paymentHash = decoded.tags.find((tag) => tag.tagName === 'payment_hash')?.data;

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

        const memo = (decoded.tags?.find(t => t.tagName === 'description')?.data) || '';

        setDecodedInvoice({
          invoice: decoded.paymentRequest,
          network: networkName,
          payeeNodeKey: decoded.payeeNodeKey,
          satoshis: decoded.satoshis,
          paymentHash,
          timestampString,
          expirationStatus,
          memo,
          link: generateLink(decoded.payeeNodeKey, networkName)
        });

        // If the network is 'mainnet', fetch additional node data
        if (networkName === 'mainnet' && decoded.payeeNodeKey) {
          fetchNodeData(decoded.payeeNodeKey);
        } else {
          setRawNodeData(null);
        }

        setErrorMessage(null);
      } catch (decodeError) {
        setDecodingSuccessful(false)  // Set to false if decoding fails
        console.error("Decoding failed: ", decodeError.message);
        setErrorMessage("Decoding failed: " + decodeError.message);
      }

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
        { url: `https://1ml.com/node/${payeeNodeKey}`, name: '1ml.com' },
        { url: `https://lightningnetwork.plus/nodes/${payeeNodeKey}`, name: 'lightningnetwork.plus' },
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

  const fetchNodeData = async (nodePubkey) => {
    try {
      const response = await fetch(`https://mempool.space/api/v1/lightning/nodes/${nodePubkey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRawNodeData(data); // Save the node data to state
    } catch (error) {
      console.error('Failed to fetch node data:', error);
      setRawNodeData(null);
    }
  };

  // handle the invoice from URL parameter (unless cannot be decoded)
  if (invoiceFromUrl && !rawData && decodingSuccessful) {
    const decodeUrlInvoice = (invoice) => {
      setPaymentRequest(invoice);
      decodeInvoice(invoice);
    };
    decodeUrlInvoice(invoiceFromUrl);
  }

  const flexContainerStyle = {
    display: 'flex',
    marginBottom: '5px'
  };

  const labelStyle = {
    minWidth: '130px',
    fontWeight: 'bold'
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification('Copied to clipboard');
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
    setRawNodeData(null);
    setDecodedInvoice({});
    setErrorMessage(null);
    setShowRawData(false);
    setInvoiceFromUrl('');
    setDecodingSuccessful(true);
  };

  return (
    <div>

      {invoiceFromUrl === '' && (
        <div>
          <textarea
            value={paymentRequest}
            onChange={(e) => setPaymentRequest(e.target.value)}
            style={{ width: '75%', height: '7em' }}
            placeholder="Paste a lightning invoice"
          />
          <br />
          <button onClick={decodeInvoice}>Decode</button>
          {paymentRequest && (
            <button style={{ marginLeft: '10px' }} onClick={clearData}>Clear</button>
          )}
        </div>
      )}
      {invoiceFromUrl && (
        <div>
          <textarea
            value={invoiceFromUrl}
            style={{ width: '75%', height: '7em' }}
            readOnly
          />
          <br />
          {!errorMessage && (
            <button onClick={() => copyToClipboard(invoiceFromUrl)}>Copy to clipboard</button>
          )}
          <button style={{ marginLeft: '10px' }} onClick={clearData}>Clear</button>
        </div>
      )}
      <div style={{ marginTop: '10px' }}>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {rawData && (
          <div>
            {decodedInvoice && (
              <>
                <h3>Invoice data</h3>
                <div style={{ marginTop: '10px' }}></div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>network:</div>
                  <div>{decodedInvoice.network}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>amount:</div>
                  <div>{decodedInvoice.satoshis} sats</div>
                </div>
                {decodedInvoice.memo !== '' && (
                  <div style={flexContainerStyle}>
                    <div style={labelStyle}>description:</div>
                    <div>{decodedInvoice.memo}</div>
                  </div>
                )}
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>expiry:</div>
                  <div>{decodedInvoice.expirationStatus}</div>
                </div>
                <div style={flexContainerStyle}>
                  <div style={labelStyle}>created at:</div>
                  <div>{decodedInvoice.timestampString}</div>
                </div>

                <div style={labelStyle}>payment hash:</div>
                <div style={flexContainerStyle}>
                  <div
                    style={{
                      width: "100%",
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                    onClick={() => copyToClipboard(decodedInvoice.payeeNodeKey)}
                    title="Click to copy"
                  >
                    {decodedInvoice.paymentHash}
                  </div>
                </div>

                {rawNodeData && (
                  <div style={{ marginTop: '20px' }}>
                    <h3>Destination node data</h3>
                    <div style={flexContainerStyle}>
                      <div style={labelStyle}>alias:</div>
                      <div>{rawNodeData.alias}</div>
                    </div>
                    <div style={flexContainerStyle}>
                      <div style={labelStyle}>public channels:</div>
                      <div>{rawNodeData.active_channel_count}</div>
                    </div>
                    <div style={flexContainerStyle}>
                      <div style={labelStyle}>public capacity:</div>
                      <div>{(rawNodeData.capacity / 100000000)} bitcoin</div>
                    </div>
                    <div style={flexContainerStyle}>
                      <div style={labelStyle}>last update:</div>
                      <div>{Math.round(((Date.now() / 1000) - rawNodeData.updated_at) / 60)} minutes ago</div>
                    </div>
                  </div>
                )}
                <div style={labelStyle}>public key:</div>
                <div style={flexContainerStyle}>
                  <div
                    style={{
                      width: "100%",
                      cursor: 'pointer',
                      marginLeft: '10px',
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
                  <div key={index} style={{ paddingLeft: '10px' }}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a><br />
                  </div>
                ))}
              </>
            )}

            {/* Notification Bubble */}
            {notification && (
              <div style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'orange',
                color: 'black',
                padding: '10px',
                borderRadius: '10px',
                zIndex: 1000,
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

                {/* Conditionally rendered raw data section */}
                {showRawData && (
                  <div style={{ marginTop: '20px' }}>
                    <h3>Raw Invoice Data</h3>
                    <pre style={{ marginLeft: '10px', marginTop: '10px' }}>
                      {JSON.stringify(rawData, null, 2)}
                    </pre>
                    {rawNodeData && (
                      <div>
                        <h3>Raw Node Data</h3>
                        <pre style={{ marginLeft: '10px', marginTop: '10px' }}>
                          {JSON.stringify(rawNodeData, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
