// DecoderPage.jsx
import React, { useState, useEffect } from 'react';
import useScript from '../hooks/useScript';
import CryptoJS from 'crypto-js';


export function DecoderPage() {
  const [dataFromUrl, setDataFromUrl] = useState('');
  const [decodeInput, setDecodeInput] = useState('');
  const [rawData, setRawData] = useState(null);
  const [rawNodeData, setRawNodeData] = useState(null);
  const [decodedInvoice, setDecodedInvoice] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState('');
  const [showRawData, setShowRawData] = useState(false);
  const [decodingSuccessful, setDecodingSuccessful] = useState(true);
  const [routingHintData, setRoutingHintData] = useState([]);
  const [lnaddressData, setLnaddressData] = useState(null);

  const [preimageInput, setPreimageInput] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [primageValid, setPrimageValid] = useState(false);


  useEffect(() => {
    // This code runs after component mount, window is available here
    const urlParams = new URLSearchParams(window.location.search);
    // Both invoice and lnaddress can be passed as url parameter
    // with either key 'invoice' or 'lnaddress'
    let invoiceParam = urlParams.get('invoice') || '';
    let lnaddressParam = urlParams.get('lnaddress') || '';

    // Strip 'lightning:' prefix if present
    invoiceParam = invoiceParam.startsWith('lightning:') ? invoiceParam.substring(10) : invoiceParam;
    lnaddressParam = lnaddressParam.startsWith('lightning:') ? lnaddressParam.substring(10) : lnaddressParam;

    if (invoiceParam) {
      setDataFromUrl(invoiceParam);
    } else if (lnaddressParam) {
      setDataFromUrl(lnaddressParam);
    }
  }, []);

  useEffect(() => {
    if (decodeInput) {
      if (dataFromUrl !== '' && decodeInput) {
        handleInput(decodeInput);
      }
    }
  }, [decodeInput, dataFromUrl]);

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
      let lowerCaseDecodeInput = decodeInput.toLowerCase();
      // Remove 'lightning:' prefix if present
      if (lowerCaseDecodeInput.toLowerCase().startsWith('lightning:')) {
        lowerCaseDecodeInput = lowerCaseDecodeInput.substring(10);
      }
      if (lowerCaseDecodeInput.startsWith('lnbc')) {
        networkName = "mainnet";
        customNetwork = {
          bech32: 'bc', // mainnet
          pubKeyHash: 0x42,
          scriptHash: 0xff,
          validWitnessVersions: [0, 2, 3, 4, 5]
        };
      } else if (lowerCaseDecodeInput.startsWith('lntbs')) {
        networkName = "signet";
        customNetwork = {
          bech32: 'tbs', // signet
          pubKeyHash: 0x42,
          scriptHash: 0xff,
          validWitnessVersions: [0, 2, 3, 4, 5]
        };
      } else if (lowerCaseDecodeInput.startsWith('lntb')) {
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
        decoded = lightningPayReq.decode(lowerCaseDecodeInput, customNetwork);

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

        // Check if there is any 'routing_info' tag with data in the decoded object
        const hasRoutingInfo = decoded.tags?.some(tag => tag.tagName === 'routing_info' && tag.data && tag.data.length > 0);
        let routingHints = [];
        if (hasRoutingInfo) {
          // Extract pubkeys from routing_info
          routingHints = decoded.tags
            .filter(tag => tag.tagName === 'routing_info')
            .flatMap(tag => tag.data.map(info => info.pubkey));
        }

        setDecodedInvoice({
          invoice: decoded.paymentRequest,
          network: networkName,
          payeeNodeKey: decoded.payeeNodeKey,
          satoshis: decoded.satoshis,
          paymentHash,
          timestampString,
          expirationStatus,
          memo,
          link: generateLink(decoded.payeeNodeKey, networkName),
          routingHintPubKeys: routingHints,
        });

        // If the network is 'mainnet', fetch additional node data
        if (networkName === 'mainnet' && decoded.payeeNodeKey) {
          fetchNodeData(decoded.payeeNodeKey);
        } else if (decoded.payeeNodeKey) {
          setRawNodeData({ message: `No more details are fetched for ${networkName}` });
        } else {
          setRawNodeData(null);
        }

        if (networkName === 'mainnet' && routingHints.length > 0) {
          setRoutingHintData([]); // Reset routing hint data
          routingHints.forEach(hintPubkey => fetchRoutingHintData(hintPubkey));
        } else if (routingHints.length > 0) {
          routingHints.forEach(hintPubkey => setRoutingHintData(prevData => [...prevData, { hintPubkey, message: `No more details are fetched for ${networkName}` }]));
        } else {
          setRoutingHintData([]);
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
        { url: `https://mempool.space/lightning/node/${payeeNodeKey}`, name: 'mempool.space' },
        { url: `https://amboss.space/node/${payeeNodeKey}`, name: 'amboss.space' },
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
      console.log(`Fetching node data for ${nodePubkey}`);
      const response = await fetch(`https://mempool.space/api/v1/lightning/nodes/${nodePubkey}`);
      if (!response.ok) {
        setRawNodeData(null)
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.message === "This node does not exist, or our node is not seeing it yet") {
        setRawNodeData(null);
      } else {
        setRawNodeData(data);
      }
    } catch (error) {
      console.error('Failed to fetch node data:', error);
      setRawNodeData(null);
    }
  };

  const fetchRoutingHintData = async (hintPubkey) => {
    try {
      console.log(`Fetching routing hint data for ${hintPubkey}`);
      const response = await fetch(`https://mempool.space/api/v1/lightning/nodes/${hintPubkey}`);
      if (!response.ok) {
        setRoutingHintData(prevData => [...prevData, { hintPubkey, message: "Network response was not ok" }]);
        return; // Similar to above, return here
      }
      const data = await response.json();
      if (data.message === "This node does not exist, or our node is not seeing it yet") {
        setRoutingHintData(prevData => [...prevData, { hintPubkey, message: "This node does not exist or the mempool.space node is not seeing it yet" }]);
      } else {
        setRoutingHintData(prevData => [...prevData, { hintPubkey, ...data }]);
      }
    } catch (error) {
      console.error('Failed to fetch routing hint data:', error);
      setRoutingHintData(prevData => [...prevData, { hintPubkey, message: `Failed to fetch routing hint data: ${error.toString()}` }]);
    }
  };

  const resolveLnAddress = async (lnaddress) => {
    try {
      const [username, domain] = lnaddress.split('@');
      const response = await fetch(`https://${domain}/.well-known/lnurlp/${username}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLnaddressData(data);
    } catch (error) {
      console.error('Failed to resolve lightning address:', error);
      setErrorMessage('Failed to resolve lightning address: ' + error.message);
      setLnaddressData(null);
    }
  };

  const renderLnaddressData = () => {
    if (!lnaddressData) return null;

    const lnaddresslabelStyle = {
      minWidth: '150px',
      fontWeight: 'bold',
      marginLeft: '10px'
    };

    let metadataObj = {};
    try {
      const metadataArray = JSON.parse(lnaddressData.metadata);
      metadataArray.forEach(item => {
        if (item[0] === 'text/plain') {
          metadataObj.description = item[1];
        } else if (item[0] === 'text/identifier') {
          metadataObj.lnaddress = item[1];
        }
      });
    } catch (error) {
      console.error('Error parsing metadata:', error);
    }

    return (
      <>
        <h3>Lightning Address Data</h3>
        <div style={flexContainerStyle}>
          <div style={lnaddresslabelStyle}>Callback URL:</div>
          <div>{lnaddressData.callback}</div>
        </div>
        <div style={flexContainerStyle}>
          <div style={lnaddresslabelStyle}>Min Sendable:</div>
          <div>{lnaddressData.minSendable / 1000} sats</div>
        </div>
        <div style={flexContainerStyle}>
          <div style={lnaddresslabelStyle}>Max Sendable:</div>
          <div>{lnaddressData.maxSendable / 1000} sats</div>
        </div>
        {metadataObj.description && (
          <div style={flexContainerStyle}>
            <div style={lnaddresslabelStyle}>Description:</div>
            <div>{metadataObj.description}</div>
          </div>
        )}
        {metadataObj.lnaddress && (
          <div style={flexContainerStyle}>
            <div style={lnaddresslabelStyle}>Lightning Address:</div>
            <div>{metadataObj.lnaddress}</div>
          </div>
        )}
        <div style={flexContainerStyle}>
          <div style={lnaddresslabelStyle}>Comment Allowed:</div>
          <div>{lnaddressData.commentAllowed} characters</div>
        </div>
        <div style={flexContainerStyle}>
          <div style={lnaddresslabelStyle}>Tag:</div>
          <div>{lnaddressData.tag}</div>
        </div>
        {lnaddressData.allowsNostr && (
          <div style={flexContainerStyle}>
            <div style={lnaddresslabelStyle}>Nostr:</div>
            <div>Allowed</div>
          </div>
        )}
        {lnaddressData.nostrPubkey && (
          <div style={flexContainerStyle}>
            <div style={lnaddresslabelStyle}>Nostr Pubkey:</div>
            <div>{lnaddressData.nostrPubkey}</div>
          </div>
        )}
      </>
    );
  };

  const flexContainerStyle = {
    display: 'flex',
    marginBottom: '5px'
  };

  const labelStyle = {
    minWidth: '130px',
    fontWeight: 'bold',
    marginLeft: '10px'
  };

  const oneLineStyle = {
    border: 'none',
    background: 'none',
    width: '100%',
    maxWidth: '500px',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    cursor: 'pointer',
    outline: 'none', // Hide the highlight border
    textOverflow: 'ellipsis',  // Add ellipsis at the end of the overflow
  }

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
    setRawData(null);
    setRawNodeData(null);
    setDecodedInvoice({});
    setErrorMessage(null);
    setShowRawData(false);
    setDecodingSuccessful(true);
    setRoutingHintData([]);
    setLnaddressData(null);
  };

  const clearInput = () => {
    setDecodeInput('');
    setDataFromUrl('');
    setPreimageInput('');
    setPrimageValid(false);
    clearData();
  };

  const handleInput = () => {
    clearData();
    let lowerCaseDecodeInput = decodeInput.toLowerCase();
    // Remove 'lightning:' prefix if present
    if (lowerCaseDecodeInput.startsWith('lightning:')) {
      lowerCaseDecodeInput = lowerCaseDecodeInput.substring(10);
    }
    if (lowerCaseDecodeInput.startsWith('ln')) {
      decodeInvoice(lowerCaseDecodeInput);
    } else if (lowerCaseDecodeInput.includes('@')) {
      resolveLnAddress(lowerCaseDecodeInput);
    } else {
      setErrorMessage('Invalid input. Please enter a valid lightning invoice or lightning address.');
    }
  };

  // handle the invoice from URL parameter (unless cannot be decoded)
  if (dataFromUrl && !rawData && decodingSuccessful && !lnaddressData) {
    const decodeUrlInvoice = (invoice) => {
      const lowerCaseInvoice = invoice.toLowerCase();
      if (lowerCaseInvoice.startsWith('ln')) {
        setDecodeInput(invoice);
        decodeInvoice(invoice);
      } else if (invoice.includes('@')) {
        resolveLnAddress(invoice);
      }
    };
    decodeUrlInvoice(dataFromUrl);
  }

  const verifyPayment = () => {
    try {
      // Assume preimageInput is a hex string, convert it to a WordArray
      const preimageWordArray = CryptoJS.enc.Hex.parse(preimageInput);

      // Hash the preimage WordArray
      const hashedPreimage = CryptoJS.SHA256(preimageWordArray).toString(CryptoJS.enc.Hex);

      // Get the payment hash from the decoded invoice
      const paymentHash = decodedInvoice.paymentHash;

      // Compare the hashes
      if (hashedPreimage === paymentHash) {
        setPaymentStatus('The preimage hashed matches the payment hash. This proves that the invoice was paid.');
        setPrimageValid(true);
      } else {
        setPaymentStatus('The preimage hashed does not match the payment hash.');
        setPrimageValid(false);
      }
    } catch (error) {
      setErrorMessage('Error verifying payment: ' + error.message);
    }
  };

  return (
    <div>
      {dataFromUrl === '' && (
        <div>
          <textarea
            value={decodeInput}
            onChange={(e) => setDecodeInput(e.target.value)}
            style={{ width: '100%', maxWidth: '500px', height: '7em', overflow: 'auto' }}
            placeholder="Paste a lightning invoice or a lightning address"
          />
          <br />
          <button onClick={handleInput}>Decode</button>
          {decodeInput && (
            <button style={{ marginLeft: '10px' }} onClick={clearInput}>Clear</button>
          )}
        </div>
      )}
      {dataFromUrl && (
        <div>
          <input
            type="text"
            value={dataFromUrl}
            style={oneLineStyle}
            readOnly
            onClick={() => copyToClipboard(dataFromUrl)}
            title="Click to copy"
          />
          <br />
          <button style={{ marginLeft: '10px' }} onClick={clearInput}>Clear</button>
        </div>
      )}
      <div style={{ marginTop: '10px' }} />

      {/* Display lightning address data */}
      {renderLnaddressData()}

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
              <input
                type="text"
                value={decodedInvoice.paymentHash}
                style={{ ...oneLineStyle, marginLeft: '20px' }}
                readOnly
                onClick={() => copyToClipboard(decodedInvoice.paymentHash)}
                title="Click to copy and scroll"
              />

              {routingHintData && routingHintData.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <h3>Routing Hint Data</h3>
                  {routingHintData.map((hint, index) => (
                    <div style={{ marginBottom: '20px' }} key={index}>
                      {!hint.message && (
                        <>
                          <div style={flexContainerStyle}>
                            <div style={labelStyle}>alias:</div>
                            <div>{hint.alias}</div>
                          </div>
                          <div style={flexContainerStyle}>
                            <div style={labelStyle}>public channels:</div>
                            <div>{hint.active_channel_count}</div>
                          </div>
                          <div style={flexContainerStyle}>
                            <div style={labelStyle}>public capacity:</div>
                            <div>{(hint.capacity / 100000000)} btc</div>
                          </div>
                          <div style={flexContainerStyle}>
                            <div style={labelStyle}>last update:</div>
                            <div>{Math.round(((Date.now() / 1000) - hint.updated_at) / 60)} minutes ago</div>
                          </div>
                        </>
                      )}
                      <div style={labelStyle}>public key:</div>
                      <input
                        type="text"
                        value={hint.hintPubkey}
                        style={{ ...oneLineStyle, marginLeft: '20px' }}
                        readOnly
                        onClick={() => copyToClipboard(hint.hintPubkey)}
                        title="Click to copy and scroll"
                      />

                      {/* Note for specific pubkeys */}
                      {hint.hintPubkey === "038f8f113c580048d847d6949371726653e02b928196bad310e3eda39ff61723f6" && (
                        <div style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}>
                          This invoice was likely generated with Muun wallet.
                        </div>
                      )}

                      {hint.hintPubkey === "03a6ce61fcaacd38d31d4e3ce2d506602818e3856b4b44faff1dde9642ba705976" && (
                        <div style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}>
                          This invoice was likely generated with Muun wallet.
                        </div>
                      )}

                      {hint.hintPubkey === "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f" && (
                        <div style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}>
                          This invoice was likely generated with Phoenix wallet.
                        </div>
                      )}

                      {hint.hintPubkey === "03933884aaf1d6b108397e5efe5c86bcf2d8ca8d2f700eda99db9214fc2712b134" && (
                        <div style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}>
                          This invoice was likely generated with Phoenix wallet on testnet.
                        </div>
                      )}

                      {hint.message && (
                        <div style={flexContainerStyle}>
                          <div style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }} >{hint.message}</div>
                        </div>
                      )}
                      <div style={flexContainerStyle}>
                        <div style={labelStyle}>explore:</div>
                      </div>
                      <div>
                        {generateLink(hint.hintPubkey, decodedInvoice.network).map((link, index) => (
                          <div key={index} style={{ display: 'inline-block', paddingLeft: '20px' }}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: '10px' }}></div>
              <h3>Destination node data</h3>
              {rawNodeData && (
                !rawNodeData.message && (
                  <div>
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
                      <div>{(rawNodeData.capacity / 100000000)} btc</div>
                    </div>
                    <div style={flexContainerStyle}>
                      <div style={labelStyle}>last update:</div>
                      <div>{Math.round(((Date.now() / 1000) - rawNodeData.updated_at) / 60)} minutes ago</div>
                    </div>
                  </div>
                )
              )}

              <div style={labelStyle}>public key:</div>
              <input
                type="text"
                value={decodedInvoice.payeeNodeKey}
                style={{ ...oneLineStyle, marginLeft: '20px' }}
                readOnly
                onClick={() => copyToClipboard(decodedInvoice.payeeNodeKey)}
                title="Click to copy and scroll"
              />

              {rawNodeData && rawNodeData.message && (
                <div style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}>{rawNodeData.message}</div>
              )}

              {rawNodeData ? (
                <div>
                  <div style={flexContainerStyle}>
                    <div style={labelStyle}>explore:</div>
                  </div>
                  {generateLink(decodedInvoice.payeeNodeKey, decodedInvoice.network).map((link, index) => (
                    <div key={index} style={{ display: 'inline-block', paddingLeft: '20px' }}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ marginLeft: '10px', marginTop: '10px' }} >No public data is available about this node</div>
              )
              }
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
        </div >
      )}

      <div style={{ marginTop: '20px' }}>

        {/* Conditionally render the button to toggle raw data */}
        {(rawData || lnaddressData) && (
          <button onClick={toggleRawData}>
            {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
          </button>
        )}

        {/* Conditionally rendered raw data section */}
        {showRawData && (
          <div style={{ marginTop: '20px' }}>
            {rawData && (
              <div>
                <h3>Raw Invoice Data</h3>
                <pre style={{ marginLeft: '10px', marginTop: '10px' }}>
                  {JSON.stringify(rawData, null, 2)}
                </pre>
              </div>
            )}
            {rawNodeData && (
              <div>
                <h3>Raw Node Data</h3>
                <pre style={{ marginLeft: '10px', marginTop: '10px' }}>
                  {JSON.stringify(rawNodeData, null, 2)}
                </pre>
              </div>
            )}
            {routingHintData && routingHintData.length > 0 && (
              <div>
                <h3>Raw Routing Hint Data</h3>
                <pre style={{ marginLeft: '10px', marginTop: '10px' }}>
                  {JSON.stringify(routingHintData, null, 2)}
                </pre>
              </div>
            )}
            {lnaddressData && (
              <div>
                <h3>Raw Lightning Address Data</h3>
                <pre style={{ marginLeft: '10px', marginTop: '10px' }}>
                  {JSON.stringify(lnaddressData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div >
      {decodedInvoice.paymentHash && (
        <>
          <div style={{ marginTop: '20px' }}>
            <h3>Know the preimage? Verify it below:</h3>
            <input
              type="text"
              value={preimageInput}
              onChange={(e) => setPreimageInput(e.target.value)}
              placeholder="Enter the preimage"
              style={{ width: '100%', maxWidth: '500px' }}
            />
            <div></div>
            <button onClick={verifyPayment}>Verify Payment</button>
          </div>
          {paymentStatus && (
            <div style={{
              marginTop: '10px',
              color: primageValid ? 'green' : 'red', // Conditional styling
              fontWeight: 'bold'
            }}>
              {paymentStatus}
            </div>
          )}
        </>
      )}
    </div >
  );
}
