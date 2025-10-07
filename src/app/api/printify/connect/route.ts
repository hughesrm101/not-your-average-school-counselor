import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'connect') {
      // Redirect to Printify OAuth
      const authUrl = `https://api.printify.com/v1/oauth/authorize?client_id=${process.env.PRINTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.PRINTIFY_REDIRECT_URI || '')}&scope=products:read+products:write+orders:read+orders:write`;
      
      return NextResponse.json({
        success: true,
        authUrl
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Printify connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to Printify' },
      { status: 500 }
    );
  }
}
