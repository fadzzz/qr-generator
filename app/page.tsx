'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function QRGenerator() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const generateQR = async () => {
    try {
      const response = await fetch('https://qr-code-gen.fadico.workers.dev/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      setResult(data);
      if (data.url) {
        setError('');
      }
    } catch (err) {
      setError('Error generating QR code. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">QR Code Generator</h1>
        
        <div className="space-y-4">
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          
          <button 
            onClick={generateQR}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Generate QR Code
          </button>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-3 text-red-700">{error}</p>
              </div>
            </div>
          )}

          {result?.url && (
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={result.url} 
                alt="Generated QR Code" 
                className="w-48 h-48"
              />
              <button 
                onClick={() => window.open(result.url, '_blank')}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
