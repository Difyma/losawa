import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

async function attemptGetAdmin() {
  return await getCurrentAdmin()
}

export async function GET() {
  try {
    console.log('=== AUTH ME CALLED ===')
    
    // Retry logic
    let admin = null
    const maxRetries = 5
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`Auth check attempt ${i + 1}/${maxRetries}`)
        admin = await attemptGetAdmin()
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
    
    if (!admin) {
      console.log('No admin found - returning 401')
      return NextResponse.json(
        { error: 'Not authenticated' },
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
