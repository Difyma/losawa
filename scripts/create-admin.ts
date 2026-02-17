/**
 * Script to create admin user
 * Run with: npx tsx scripts/create-admin.ts
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function main() {
  try {
    console.log('🔐 Create Admin User\n')

    const email = await question('Email: ')
    const password = await question('Password: ')

    if (!email || !password) {
      console.error('❌ Email and password are required')
      process.exit(1)
    }

    // Check if user already exists
    const existing = await prisma.adminUser.findUnique({
      where: { email },
    })

    if (existing) {
      console.error('❌ User with this email already exists')
      process.exit(1)
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create admin user
    const admin = await prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        role: 'admin',
      },
    })

    console.log('\n✅ Admin user created successfully!')
    console.log(`   Email: ${admin.email}`)
    console.log(`   Role: ${admin.role}`)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

main()
