# Authentication System

This project uses **Supabase** for user authentication on the main website.

## Setup

### Environment Variables

Make sure your `.env` file includes:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xvlalpmpqiiqnfmxehwu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_sLgn_D9tZ9_eGd5BWtAfnA_HsOQUVpx
```

## Features

### User Authentication (Supabase)

- **Registration**: Users can create accounts at `/auth/register`
- **Login**: Users can sign in at `/auth/login`
- **Session Management**: Automatic session refresh via middleware
- **User Menu**: Displayed in header when logged in
- **Sign Out**: Available in user menu

### Admin Authentication (Custom)

The admin panel uses a separate authentication system:
- Admin login: `/admin/login`
- Protected by custom session management (see `lib/auth.ts`)
- Uses Prisma database for admin users
- See `README_ADMIN.md` for admin panel details

## Architecture

### Client-Side

- **AuthContext** (`contexts/AuthContext.tsx`): React context providing user state
- **Supabase Client** (`lib/supabase/client.ts`): Browser client for auth operations
- **Header Component**: Displays login/logout based on auth state

### Server-Side

- **Middleware** (`middleware.ts`): Handles session refresh for Supabase
- **Supabase Server Client** (`lib/supabase/server.ts`): Server-side client for API routes

## Pages

- `/auth/login` - User login page
- `/auth/register` - User registration page

## Usage in Components

```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please log in</div>
  
  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## Protected Routes

To protect a route, check the user in your component:

```tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])
  
  if (loading || !user) return <div>Loading...</div>
  
  return <div>Protected content</div>
}
```

## Notes

- Admin panel authentication is separate from user authentication
- User sessions are managed by Supabase
- Admin sessions are managed by custom cookie-based system
- Middleware refreshes Supabase sessions automatically
