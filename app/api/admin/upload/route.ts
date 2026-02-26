import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// Create Supabase client with service role (lazy initialization)
let supabaseInstance: ReturnType<typeof createClient> | null = null
function getSupabase() {
  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!url || !key || key === 'placeholder-service-role-key') {
      throw new Error('Supabase configuration missing')
    }
    
    supabaseInstance = createClient(url, key)
  }
  return supabaseInstance
}

export async function POST(request: NextRequest) {
  console.log('=== UPLOAD START ===')
  
  try {
    console.log('Checking admin...')
    await requireAdmin()
    console.log('Admin check passed')

    console.log('Parsing form data...')
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.log('No file provided')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
    })

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      console.log('Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 4MB for Vercel limit)
    const maxSize = 4 * 1024 * 1024 // 4MB
    if (file.size > maxSize) {
      console.log('File too large:', file.size)
      return NextResponse.json(
        { error: `File too large. Maximum size is 4MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 413 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()?.toLowerCase()
    const filename = `product-${timestamp}.${extension}`

    console.log('Converting file to buffer...')
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('Buffer size:', buffer.length)

    console.log('Uploading to Supabase...')
    // Upload to Supabase Storage
    const supabase = getSupabase()
    const { data, error } = await supabase
      .storage
      .from('products')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      
      // If bucket doesn't exist, try to create it
      if (error.message?.includes('bucket') || error.message?.includes('Bucket')) {
        return NextResponse.json(
          { error: 'Storage bucket not found. Please create "products" bucket in Supabase.' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to upload to storage: ' + error.message },
        { status: 500 }
      )
    }

    console.log('Upload successful:', data)

    // Get public URL
    const { data: { publicUrl } } = getSupabase()
      .storage
      .from('products')
      .getPublicUrl(filename)

    console.log('Public URL:', publicUrl)
    console.log('=== UPLOAD COMPLETE ===')

    return NextResponse.json({
      success: true,
      filename,
      path: publicUrl,
    })
  } catch (error: any) {
    console.error('=== UPLOAD ERROR ===')
    console.error('Error:', error)
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json(
      { error: 'Failed to upload file: ' + error.message },
      { status: 500 }
    )
  }
}

// Increase body size limit for App Router
export const maxDuration = 60
