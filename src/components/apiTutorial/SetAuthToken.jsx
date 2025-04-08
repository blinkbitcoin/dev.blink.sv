// SetAuthToken.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export function SetAuthToken() {
  const { setAuthToken } = useAuth();

  const handleAuthTokenChange = (e) => {
    setAuthToken(e.target.value);
  };

  return (
    <div>
      <div>
        <strong>API Authentication:</strong> Enter your API key to be used in the <code>X-API-KEY</code> header:
      </div>
      <input
        type="text"
        placeholder="Paste your API key (starts with 'blink_...' or 'galoy_staging_...')"
        onChange={handleAuthTokenChange}
        style={{ width: '50%', marginBottom: '10px' }}
      />
      <div style={{ fontSize: '0.85em', color: '#666', marginTop: '5px' }}>
        Get your API key from the <a href="https://dashboard.blink.sv" target="_blank" rel="noopener noreferrer">Blink Dashboard</a> under API Keys section.
      </div>
    </div>
  );
}
