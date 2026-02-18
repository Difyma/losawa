import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('=== AUTH ME CALLED ===')
    
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    
    console.log('All cookies received:', allCookies.map(c => ({ name: c.name, value: c.value.substring(0, 10) + '...' })))
    
    const adminSession = cookieStore.get('admin_session')
    console.log('admin_session cookie:', adminSession ? 'FOUND' : 'NOT FOUND')
    
    if (adminSession) {
      console.log('Session value:', adminSession.value.substring(0, 20) + '...')
    }
    
    const admin = await getCurrentAdmin()
    
    if (!admin) {
      console.log('No admin found - returning 401')
      return NextResponse.json(
        { error: 'Not authenticated', cookiesReceived: allCookies.map(c => c.name) },
        { status: 401 }
      )
    }

    console.log('Admin found:', admin.email)
    console.log('=== AUTH ME COMPLETE ===')

    return NextResponse.json({
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Failed to check authentication' },
      { status: 500 }
    )
  }
}
