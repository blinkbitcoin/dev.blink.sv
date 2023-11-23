// hooks/useScript.js
import { useEffect, useState } from 'react';

const useScript = (src) => {
  const [status, setStatus] = useState(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    // Check if the script is already loaded
    let script = document.querySelector(`script[src="${src}"]`);
    if (script) {
      setStatus('ready');
      return;
    }

    // Create a script element
    script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => setStatus('ready');
    script.onerror = () => setStatus('error');

    // Add script to document
    document.body.appendChild(script);

    // Remove script on cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return status;
};

export default useScript;
