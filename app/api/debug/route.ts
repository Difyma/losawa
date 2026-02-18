import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('Debug endpoint called')
    
    // Test 1: Check env
    const envCheck = {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlLength: process.env.DATABASE_URL?.length || 0,
    }
    console.log('Env check:', envCheck)
    
    // Test 2: Try simple query
    let dbCheck = { success: false, error: null as any, count: 0 }
    try {
      const result = await prisma.$queryRaw`SELECT 1 as test`
      dbCheck = { success: true, error: null, count: 1 }
      console.log('DB query success:', result)
    } catch (e: any) {
      dbCheck = { success: false, error: e.message, count: 0 }
      console.error('DB query failed:', e.message)
    }
    
    // Test 3: Try count categories
    let categoryCheck = { success: false, count: 0, error: null as any }
    try {
      const count = await prisma.category.count()
      categoryCheck = { success: true, count, error: null }
      console.log('Category count:', count)
    } catch (e: any) {
      categoryCheck = { success: false, count: 0, error: e.message }
      console.error('Category count failed:', e.message)
    }

    return NextResponse.json({
      status: 'debug',
      timestamp: new Date().toISOString(),
      env: envCheck,
      dbConnection: dbCheck,
      categories: categoryCheck,
    })
  } catch (error: any) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({
      status: 'error',
      error: error.message,
      stack: error.stack,
    }, { status: 500 })
  }
}
