# Vercel + Supabase Setup

## Environment Variables (Vercel)

### Database (Supabase)
```
DATABASE_URL="postgres://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

Get these from Supabase Dashboard → Project Settings → Database → Connection String

### Supabase Storage
```
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
```

### Admin Auth
```
ADMIN_PASSWORD_HASH=[BCRYPT_HASH]
```

Generate hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## Database Setup

1. Create Supabase project
2. Run migrations:
```bash
npx prisma migrate deploy
```

3. Seed data:
```bash
npx prisma db seed
```

Or manually insert admin user:
```sql
INSERT INTO "AdminUser" (id, email, "passwordHash", role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@losawa.com',
  '$2a$10$...', -- your bcrypt hash
  'admin',
  NOW(),
  NOW()
);
```

## Important Notes

- SQLite doesn't work on Vercel (read-only filesystem)
- Must use PostgreSQL with connection pooling (pgBouncer)
- DIRECT_URL is for migrations, DATABASE_URL for app
