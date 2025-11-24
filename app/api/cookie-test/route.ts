import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Set cookie test endpoint called');
  
  const response = NextResponse.json({ message: 'Cookie set' });
  
  // Set a simple test cookie
  response.cookies.set('test-cookie', 'test-value', {
    httpOnly: false, // Make it visible in browser for testing
    secure: false,
    sameSite: 'lax',
    maxAge: 3600,
    path: '/'
  });
  
  console.log('Test cookie set');
  return response;
}

export async function POST(request: NextRequest) {
  console.log('Simple login test called');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const response = NextResponse.json({ 
      message: 'Test login successful',
      received: body 
    });
    
    // Set a simple cookie without JWT for testing
    response.cookies.set('simple-token', 'simple-test-value', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600,
      path: '/'
    });
    
    console.log('Simple cookie set in test login');
    return response;
    
  } catch (error) {
    console.error('Error in test login:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}