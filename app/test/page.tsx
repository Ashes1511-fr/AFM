'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TestPage() {
  const [result, setResult] = useState('');

  const testLogin = async () => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'admin@example.com', 
          password: 'admin123' 
        })
      });

      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const data = await response.json();
      
      setResult(JSON.stringify({
        status: response.status,
        headers: headers,
        data: data
      }, null, 2));

    } catch (error) {
      setResult('Error: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const testCookies = async () => {
    try {
      const response = await fetch('/api/test-auth');
      const data = await response.json();
      setResult('Cookies: ' + JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Login Test Page</h1>
      
      <div className="space-y-4">
        <Button onClick={testLogin}>Test Login API</Button>
        <Button onClick={testCookies} className="border border-gray-300">Check Cookies</Button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Result:</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
          {result}
        </pre>
      </div>
    </div>
  );
}