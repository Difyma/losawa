-- Add Banner table
CREATE TABLE IF NOT EXISTS "Banner" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image TEXT NOT NULL,
  link TEXT,
  "order" INTEGER DEFAULT 0,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Banner_isActive_idx" ON "Banner"("isActive");
CREATE INDEX IF NOT EXISTS "Banner_order_idx" ON "Banner"("order");

-- Insert sample banners
INSERT INTO "Banner" (id, title, subtitle, image, link, "order", "isActive", "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'New Collection', 'Discover our latest designs', '/slide1.jpg', '/collections', 0, true, NOW(), NOW()),
  (gen_random_uuid(), 'Summer Sale', 'Up to 30% off selected items', '/slide2.jpg', '/shop', 1, true, NOW(), NOW()),
  (gen_random_uuid(), 'Exclusive Jewelry', 'Handcrafted with love', '/slide3.jpg', '/collections/eclat', 2, true, NOW(), NOW());

-- Verify
SELECT 'Banners created:' as info, COUNT(*) as count FROM "Banner";
