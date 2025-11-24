import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  
  return NextResponse.json({
    hasCookie: !!token,
    token: token ? token.substring(0, 20) + '...' : null,
    allCookies: request.cookies.getAll().map(cookie => ({ name: cookie.name, hasValue: !!cookie.value }))
  });
}