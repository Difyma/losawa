import bcrypt from 'bcryptjs'
import { prisma, withRetry } from './prisma'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-change-in-production'

export interface AdminUser {
  id: string
  email: string
  role: string
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Create session
export async function createSession(userId: string): Promise<string> {
  const sessionId = `${userId}-${Date.now()}`
  return sessionId
}

// Get current admin user
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value
    
    if (!sessionId) {
      return null
    }

    const userId = sessionId.split('-')[0]
    
    const user = await withRetry(() => 
      prisma.adminUser.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
        },
      })
    )

    return user
  } catch (error) {
    console.error('Error getting current admin:', error)
    return null
  }
}

// Login
export async function login(email: string, password: string): Promise<AdminUser | null> {
  const user = await withRetry(() => 
    prisma.adminUser.findUnique({
      where: { email },
    })
  )

  if (!user) {
    return null
  }

  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  }
}

// Logout
export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

// Check if user is admin
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin()
  if (!admin) {
    throw new Error('Unauthorized')
  }
  return admin
}
