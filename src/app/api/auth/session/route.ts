import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: session.user.sub,
        email: session.user.email,
        name: session.user.name,
        firstName: session.user.given_name,
        lastName: session.user.family_name,
        groups: session.user['cognito:groups'] || [],
        emailVerified: session.user.email_verified,
      },
    });
  } catch (error) {
    console.error('Error getting session:', error);
    return NextResponse.json(
      { error: 'Failed to get session' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Clear session cookies
    const response = NextResponse.json({ success: true });
    
    response.cookies.delete('access_token');
    response.cookies.delete('id_token');
    response.cookies.delete('refresh_token');
    response.cookies.delete('expires_at');
    
    return response;
  } catch (error) {
    console.error('Error clearing session:', error);
    return NextResponse.json(
      { error: 'Failed to clear session' },
      { status: 500 }
    );
  }
}
