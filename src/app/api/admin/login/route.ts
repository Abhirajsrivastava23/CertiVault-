import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const { username, password } = validated.data;

    // Validate credentials: username admin@123, password certivault123
    const isValid = 
      (username.trim().toLowerCase() === 'admin@123' || username.trim().toLowerCase() === 'admin@certivault.in') && 
      password.trim() === 'certivault123';

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin username or password' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful',
      user: {
        role: 'admin',
        username: 'admin@123',
        fullName: 'CertiVault Master Administrator',
      },
    });

    // Set secure admin session cookie
    response.cookies.set('certivault_admin_session', 'authenticated', {
      httpOnly: false, // accessible to client for quick state checks
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Error in /api/admin/login:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}

