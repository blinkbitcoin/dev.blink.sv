// SetApiEndpoint.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export function SetApiEndpoint() {
  const { apiEndpoint, setApiEndpoint } = useAuth();

  const handleApiEndpointChange = (e) => {
    setApiEndpoint(e.target.value);
  };

  return (
    <div>
      <div>The GraphQL endpoint to connect to:</div>
      <select
        type="text"
        value={apiEndpoint}
        onChange={handleApiEndpointChange}
        style={{ width: '50%', marginBottom: '10px' }}
      >
        <option value="https://api.blink.sv/graphql">Blink (mainnet) - https://api.blink.sv/graphql</option>
        <option value="https://api.staging.blink.sv/graphql">Staging (signet) - https://api.staging.blink.sv/graphql</option>
      </select>
    </div>
  );
}
