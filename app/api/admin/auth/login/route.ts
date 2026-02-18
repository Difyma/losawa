import { NextRequest, NextResponse } from 'next/server'
import { login } from '@/lib/auth'

export const dynamic = 'force-dynamic'

async function attemptLogin(email: string, password: string) {
  const user = await login(email, password)
  return user
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('=== LOGIN ATTEMPT ===')
    console.log('Email:', email)

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Retry logic
    let user = null
    let lastError: any
    const maxRetries = 5
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`Login attempt ${i + 1}/${maxRetries}`)
        user = await attemptLogin(email, password)
        break
      } catch (error: any) {
        lastError = error
        console.log(`Attempt ${i + 1} failed:`, error.message)
        
        if (error.message?.includes('MaxClientsInSessionMode') && i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)))
          continue
        }
        throw error
      }
    }
    
    if (!user) {
      console.log('Login failed after retries')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('Login successful for user:', user.id)

    // Create session
    const sessionId = `${user.id}-${Date.now()}`

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })

    // Set cookie in response
    response.cookies.set('admin_session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

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
