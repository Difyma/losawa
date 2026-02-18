-- Seed data for Losawa database
-- Run this in Supabase SQL Editor

-- Clear existing data
DELETE FROM "OrderItem";
DELETE FROM "Order";
DELETE FROM "Product";
DELETE FROM "Collection";
DELETE FROM "Category";

-- Insert Categories
INSERT INTO "Category" (id, slug, name, "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'rings', 'Rings', NOW(), NOW()),
  (gen_random_uuid(), 'earrings', 'Earrings', NOW(), NOW()),
  (gen_random_uuid(), 'necklaces', 'Necklaces & Pendants', NOW(), NOW()),
  (gen_random_uuid(), 'bracelets', 'Bracelets', NOW(), NOW()),
  (gen_random_uuid(), 'engagement', 'Love & Engagement', NOW(), NOW()),
  (gen_random_uuid(), 'watches', 'Watches', NOW(), NOW());

-- Get category IDs
DO $$
DECLARE
  cat_rings UUID;
  cat_earrings UUID;
  cat_necklaces UUID;
  cat_bracelets UUID;
BEGIN
  SELECT id INTO cat_rings FROM "Category" WHERE slug = 'rings';
  SELECT id INTO cat_earrings FROM "Category" WHERE slug = 'earrings';
  SELECT id INTO cat_necklaces FROM "Category" WHERE slug = 'necklaces';
  SELECT id INTO cat_bracelets FROM "Category" WHERE slug = 'bracelets';

  -- Insert Collections
  INSERT INTO "Collection" (id, slug, name, description, image, subtitle, quote, "fullDescription", "createdAt", "updatedAt") VALUES
    (gen_random_uuid(), 'cleopatra', 'Cleopatra', 'Inspired by the legendary Egyptian queen', '/collections/cleopatra.jpg', 'Royal Elegance', 'Beauty that transcends time', 'A collection inspired by the legendary Egyptian queen, featuring bold designs and luxurious materials.', NOW(), NOW()),
    (gen_random_uuid(), 'jacqueline', 'Jacqueline', 'Timeless elegance inspired by Jackie Kennedy', '/collections/jacqueline.jpg', 'Classic Sophistication', 'Elegance is the only beauty that never fades', 'Timeless pieces inspired by the iconic style of Jackie Kennedy.', NOW(), NOW()),
    (gen_random_uuid(), 'eclat', 'Éclat', 'Radiant brilliance in every piece', '/collections/eclat.jpg', 'Radiant Brilliance', 'Shine with inner light', 'Pieces designed to capture and reflect light beautifully.', NOW(), NOW()),
    (gen_random_uuid(), 'embrace', 'Embrace', 'Warm, embracing designs for everyday wear', '/collections/embrace.jpg', 'Warm Embrace', 'Jewelry that hugs your soul', 'Comfortable, wearable pieces perfect for everyday elegance.', NOW(), NOW());

  -- Insert Products
  INSERT INTO "Product" (name, price, image, material, description, "isActive", "dateAdded", "createdAt", "updatedAt", "categoryId", "collectionId") VALUES
    -- Rings
    ('Cleopatra Gold Ring', 1250, '/products/ring1.jpg', '18K Gold', 'Beautiful cleopatra gold ring crafted from 18K Gold', true, NOW(), NOW(), NOW(), cat_rings, (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Jacqueline Diamond Ring', 2800, '/products/ring2.jpg', 'Platinum, Diamond', 'Beautiful jacqueline diamond ring crafted from Platinum, Diamond', true, NOW(), NOW(), NOW(), cat_rings, (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Éclat Sapphire Ring', 1850, '/products/ring3.jpg', 'White Gold, Sapphire', 'Beautiful éclat sapphire ring crafted from White Gold, Sapphire', true, NOW(), NOW(), NOW(), cat_rings, (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    -- Earrings
    ('Cleopatra Drop Earrings', 950, '/products/earring1.jpg', '18K Gold', 'Beautiful cleopatra drop earrings crafted from 18K Gold', true, NOW(), NOW(), NOW(), cat_earrings, (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Jacqueline Pearl Earrings', 750, '/products/earring2.jpg', 'Pearl, Gold', 'Beautiful jacqueline pearl earrings crafted from Pearl, Gold', true, NOW(), NOW(), NOW(), cat_earrings, (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Éclat Diamond Studs', 1200, '/products/earring3.jpg', 'Diamond, Platinum', 'Beautiful éclat diamond studs crafted from Diamond, Platinum', true, NOW(), NOW(), NOW(), cat_earrings, (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    -- Necklaces
    ('Cleopatra Pendant Necklace', 1450, '/products/necklace1.jpg', '18K Gold, Emerald', 'Beautiful cleopatra pendant necklace crafted from 18K Gold, Emerald', true, NOW(), NOW(), NOW(), cat_necklaces, (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Jacqueline Pearl Necklace', 2200, '/products/necklace2.jpg', 'Pearl, Gold', 'Beautiful jacqueline pearl necklace crafted from Pearl, Gold', true, NOW(), NOW(), NOW(), cat_necklaces, (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Éclat Diamond Necklace', 3500, '/products/necklace3.jpg', 'Diamond, Platinum', 'Beautiful éclat diamond necklace crafted from Diamond, Platinum', true, NOW(), NOW(), NOW(), cat_necklaces, (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    -- Bracelets
    ('Cleopatra Cuff Bracelet', 1800, '/products/bracelet1.jpg', '18K Gold', 'Beautiful cleopatra cuff bracelet crafted from 18K Gold', true, NOW(), NOW(), NOW(), cat_bracelets, (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Jacqueline Chain Bracelet', 650, '/products/bracelet2.jpg', 'Gold', 'Beautiful jacqueline chain bracelet crafted from Gold', true, NOW(), NOW(), NOW(), cat_bracelets, (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Éclat Tennis Bracelet', 4200, '/products/bracelet3.jpg', 'Diamond, White Gold', 'Beautiful éclat tennis bracelet crafted from Diamond, White Gold', true, NOW(), NOW(), NOW(), cat_bracelets, (SELECT id FROM "Collection" WHERE slug = 'eclat'));

END $$;

-- Verify data
SELECT 'Categories:' as info, COUNT(*) as count FROM "Category"
UNION ALL
SELECT 'Collections:', COUNT(*) FROM "Collection"
UNION ALL
SELECT 'Products:', COUNT(*) FROM "Product";
