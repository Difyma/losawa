import { NextRequest, NextResponse } from 'next/server'
import { login } from '@/lib/auth'

export const dynamic = 'force-dynamic'

async function attemptLogin(email: string, password: string) {
  return await login(email, password)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('=== LOGIN ATTEMPT ===')

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Retry logic
    let user = null
    const maxRetries = 5
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`Login attempt ${i + 1}/${maxRetries}`)
        user = await attemptLogin(email, password)
        break
      } catch (error: any) {
        console.log(`Attempt ${i + 1} failed:`, error.message)
        
        if (error.message?.includes('MaxClientsInSessionMode') && i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)))
          continue
        }
        throw error
      }
    }
    
    if (!user) {
      console.log('Login failed: invalid credentials')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('Login successful for user:', user.id)

    // Create session
    const sessionId = `${user.id}-${Date.now()}`
    console.log('Session ID:', sessionId.substring(0, 20) + '...')

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })

    // Set cookie in response
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    }
    
    console.log('Setting cookie with options:', cookieOptions)
    response.cookies.set('admin_session', sessionId, cookieOptions)

    // Verify cookie was set
    const setCookie = response.cookies.get('admin_session')
    console.log('Cookie in response:', setCookie ? 'SET' : 'NOT SET')

    console.log('=== LOGIN COMPLETE ===')
    
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}
