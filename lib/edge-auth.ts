// JWT implementation for Edge Runtime
export interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Simple base64url encoding/decoding for Edge Runtime
function base64urlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64urlDecode(str: string): string {
  str += '='.repeat((4 - str.length % 4) % 4);
  return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

// Generate JWT token for Edge Runtime
export async function generateEdgeToken(payload: TokenPayload, secret: string): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + (7 * 24 * 60 * 60) // 7 days
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(tokenPayload));
  const message = `${encodedHeader}.${encodedPayload}`;

  // Create signature using Web Crypto API (available in Edge Runtime)
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  );

  const signatureArray = new Uint8Array(signature);
  const encodedSignature = base64urlEncode(
    String.fromCharCode.apply(null, Array.from(signatureArray))
  );

  return `${message}.${encodedSignature}`;
}

// Verify JWT token for Edge Runtime
export async function verifyEdgeToken(token: string, secret: string): Promise<TokenPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const message = `${encodedHeader}.${encodedPayload}`;

    // Verify signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signature = new Uint8Array(
      base64urlDecode(encodedSignature)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      encoder.encode(message)
    );

    if (!isValid) {
      return null;
    }

    // Parse payload
    const payload = JSON.parse(base64urlDecode(encodedPayload)) as TokenPayload;

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Edge token verification error:', error);
    return null;
  }
}