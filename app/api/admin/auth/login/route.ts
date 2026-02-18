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

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })

    // Set cookie - используем sameSite: 'none' для cross-site cookies
    response.cookies.set('admin_session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    console.log('Cookie set with sameSite: none')
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
