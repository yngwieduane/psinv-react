'use client'; 

import { useState } from 'react';

// Define the expected structure of a successful response from your 
// API route: /api/cache-data
interface CacheSuccessResponse {
  message: string;
  count: number;
}

export default function CacheButton() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCache = async () => {
    setLoading(true);
    setMessage('Caching data... Please wait.');
    
    try {
      const response = await fetch('/api/cache-data', { 
        method: 'POST',
        // Optional: Indicate that you expect JSON back
        headers: {
            'Content-Type': 'application/json',
        },
      });

      // The response body can be either success or an error message
      const result: CacheSuccessResponse | { message: string; error?: string } = await response.json();
      
      if (response.ok) {
        // Narrowing the type assertion for the success case
        const successResult = result as CacheSuccessResponse; 
        setMessage(`✅ Success! ${successResult.message} (${successResult.count} items stored)`);
      } else {
        // Handling the error case
        const errorResult = result as { message: string; error?: string };
        setMessage(`❌ Error: ${errorResult.message}`);
      }
      
    } catch (error) {
      // Handling network errors or failed JSON parsing
      const errorMessage = error instanceof Error ? error.message : 'A network error occurred.';
      setMessage(`🚨 Critical Fetch Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '10px 0' }}>
      <button 
        onClick={handleCache} 
        disabled={loading}
        style={{ 
            padding: '10px 15px', 
            backgroundColor: loading ? '#ccc' : '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Processing...' : 'Cache API Data to Local File (POST /api/cache-data)'}
      </button>
      <p style={{ marginTop: '10px', minHeight: '20px' }}>{message}</p>
    </div>
  );
}