// SetAuthToken.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export function SetAuthToken() {
  const { setAuthToken } = useAuth();

  const handleAuthTokenChange = (e) => {
    const tokenValue = e.target.value;
    setAuthToken(tokenValue);
  };

  return (
    <div>
      <div>A valid authentication token is required in the header as a bearer token:</div>
      <input
        type="text"
        placeholder="Paste the authentication token to use it"
        onChange={handleAuthTokenChange}
        style={{ width: '50%', marginBottom: '10px' }}
      />
    </div>
  );
}
