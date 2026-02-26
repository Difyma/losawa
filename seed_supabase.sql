-- Полная загрузка данных в Supabase
-- Выполни этот скрипт в Supabase SQL Editor

-- ============================================
-- КОЛЛЕКЦИИ
-- ============================================
INSERT INTO "Collection" ("id", "slug", "name", "description", "image", "subtitle", "quote", "fullDescription", "createdAt", "updatedAt") 
VALUES 
  (gen_random_uuid(), 'cleopatra', 'Cleopatra', 'Inspired by the legendary Egyptian queen', '/collections/cleopatra.jpg', 'Royal Elegance', 'Beauty that transcends time', 'A collection inspired by the legendary Egyptian queen, featuring bold designs and luxurious materials.', NOW(), NOW()),
  (gen_random_uuid(), 'jacqueline', 'Jacqueline', 'Timeless elegance inspired by Jackie Kennedy', '/collections/jacqueline.jpg', 'Classic Sophistication', 'Elegance is the only beauty that never fades', 'Timeless pieces inspired by the iconic style of Jackie Kennedy.', NOW(), NOW()),
  (gen_random_uuid(), 'eclat', 'Éclat', 'Radiant brilliance in every piece', '/collections/eclat.jpg', 'Radiant Brilliance', 'Shine with inner light', 'Pieces designed to capture and reflect light beautifully.', NOW(), NOW()),
  (gen_random_uuid(), 'embrace', 'Embrace', 'Warm, embracing designs for everyday wear', '/collections/embrace.jpg', 'Warm Embrace', 'Jewelry that hugs your soul', 'Comfortable, wearable pieces perfect for everyday elegance.', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- КАТЕГОРИИ
-- ============================================
INSERT INTO "Category" ("id", "slug", "name", "description", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'rings', 'Rings', 'Elegant rings for every occasion', NOW(), NOW()),
  (gen_random_uuid(), 'earrings', 'Earrings', 'Stunning earrings to complete your look', NOW(), NOW()),
  (gen_random_uuid(), 'necklaces', 'Necklaces & Pendants', 'Beautiful necklaces and pendants', NOW(), NOW()),
  (gen_random_uuid(), 'bracelets', 'Bracelets', 'Elegant bracelets and talismans', NOW(), NOW()),
  (gen_random_uuid(), 'engagement', 'Love & Engagement', 'Rings for special moments', NOW(), NOW()),
  (gen_random_uuid(), 'watches', 'Watches', 'Luxury timepieces', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- ТОВАРЫ
-- ============================================
DELETE FROM "Product";

INSERT INTO "Product" ("name", "price", "image", "material", "description", "isActive", "dateAdded", "createdAt", "updatedAt", "categoryId", "collectionId") VALUES
    ('Cleopatra Green Sapphire Ring', 4000, '/products/cleopatra-green-sapphire-ring.jpg', '18K Gold, Green Sapphire, Diamond', 'Egyptian-inspired ring with green sapphire and diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Cleopatra Pink Sapphire Ring', 4000, '/products/cleopatra-pink-sapphire-ring.jpg', '18K Gold, Pink Sapphire, Diamond', 'Egyptian-inspired ring with pink sapphire and diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Cleopatra Tanzanite Ring', 5200, '/products/cleopatra-tanzanite-ring.jpg', '18K Gold, Tanzanite, Diamond', 'Blue tanzanite ring with handmade diamond shank', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Ambition Ring', 3500, '/products/ambition-ring.jpg', '18K Gold, Yellow Diamond, Enamel', 'Pear-shaped yellow diamond with black enamel design', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Cleopatra Sapphire Earrings', 4500, '/products/cleopatra-sapphire-earrings.jpg', '18K Gold, Sapphire, Diamond', 'Yellow and purple sapphire earrings with diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'earrings'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Ra Red Spinel Earrings', 1600, '/products/ra-red-spinel-earrings.jpg', '18K Gold, Red Spinel', 'Hoop earrings with Mahenge red spinel', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'earrings'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Selene Tourmaline Earrings', 2300, '/products/selene-tourmaline-earrings.jpg', '18K Gold, Tourmaline, Pink Sapphire', 'Multicolored tourmalines with pink sapphire halo', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'earrings'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Cleo Amethyst Talisman', 4300, '/products/cleo-amethyst-talisman.jpg', '18K Gold, Amethyst, Rose-cut Diamond', 'Amethyst talisman with rose-cut diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'bracelets'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Cleo Amethyst Talisman 2', 5500, '/products/cleo-amethyst-talisman-2.jpg', '18K Gold, Amethyst, Rose-cut Diamond', 'Amethyst talisman with rose-cut diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'bracelets'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Enigma Sapphire Choker', 21000, '/products/enigma-sapphire-choker.jpg', '18K Gold, Multicolor Sapphire', 'Multicolored sapphire necklace', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Iris Earrings', 2400, '/products/iris-earrings.jpg', '18K Gold, Yellow Sapphire, Tourmaline', 'Yellow sapphire and green tourmaline earrings', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'earrings'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Iris Pendant', 1800, '/products/iris-pendant.jpg', '18K Gold, Yellow Sapphire, Tourmaline', 'Yellow sapphire and tourmaline pendant', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Kaleidoscope Necklace', 16000, '/products/kaleidoscope-necklace.jpg', '18K Gold, Fancy Sapphire, Rose-cut Diamond', 'Fancy colored sapphires with rose-cut diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'cleopatra')),
    ('Jacqueline Ring Amethyst Turquoise', 4000, '/products/jacqueline-ring-amethyst-turquoise.jpg', '18K Gold, Amethyst, Turquoise, Diamond', 'Amethyst and turquoise statement ring', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Jacqueline Ring Amethyst White Agate', 4200, '/products/jacqueline-ring-amethyst-white-agate.jpg', '18K Gold, Amethyst, White Agate, Diamond', 'Amethyst and white agate ring', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Lumina Ring', 1400, '/products/lumina-ring.jpg', '18K White Gold, Pearl, Diamond', 'Pearl ring with diamonds in white gold', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Jacqueline Earrings', 4200, '/products/jacqueline-earrings.jpg', '18K Gold, Amethyst, Turquoise, Diamond', 'Amethyst and turquoise earrings', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'earrings'), (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Jacqueline Pearl Necklace Peach Tourmaline', 1200, '/products/jacqueline-pearl-necklace-peach-tourmaline.jpg', '18K Gold, Pearl, Peach Tourmaline', 'Pearl necklace with peach tourmaline', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Jacqueline Pearl Necklace Pastel Spinels', 1400, '/products/jacqueline-pearl-necklace-pastel-spinels.jpg', '18K Gold, Pearl, Spinel', 'Pearl necklace with pastel spinels', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Jacqueline Pearl Necklace Pastel Spinels 2', 1400, '/products/jacqueline-pearl-necklace-pastel-spinels-2.jpg', '18K White Gold, Pearl, Spinel', 'Pearl necklace with pastel spinels', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Jacqueline Amethyst Pendant', 2000, '/products/jacqueline-amethyst-pendant.jpg', '18K Gold, Amethyst, Turquoise, Diamond', 'Amethyst and turquoise pendant', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'jacqueline')),
    ('Éclat Tanzanite Ring', 7000, '/products/eclat-tanzanite-ring.jpg', '18K White Gold, Tanzanite, Tsavorite', 'Tanzanite ring with green tsavorites', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Verve Aquamarine Ring', 10000, '/products/verve-aquamarine-ring.jpg', '18K White Gold, Aquamarine, Diamond', 'Aquamarine ring with diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Wish Blue Tourmaline Ring', 2800, '/products/wish-blue-tourmaline-ring.jpg', '18K White Gold, Blue Tourmaline, Diamond', 'Blue tourmaline ring with diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Fly Ring', 1400, '/products/fly-ring.jpg', '18K White Gold, Enamel, Diamond', 'Blue enamel feather ring with diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Fly Pendant', 1600, '/products/fly-pendant.jpg', '18K White Gold, Enamel, Diamond', 'Blue enamel feather pendant', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Fly Earrings', 2500, '/products/fly-earrings.jpg', '18K White Gold, Enamel, Diamond', 'Blue enamel feather earrings', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'earrings'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Peach Tourmaline Earrings', 2800, '/products/peach-tourmaline-earrings.jpg', '18K White Gold, Peach Tourmaline, Diamond', 'Peach tourmaline earrings with diamond halo', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'earrings'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Éclat Spinel Necklace', 11000, '/products/eclat-spinel-necklace.jpg', '18K White Gold, Grey Spinel', 'Grey spinel necklace', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Temptation Spinel Necklace', 1300, '/products/temptation-spinel-necklace.jpg', '18K White Gold, Spinel', 'Spinel necklace', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Temptation Spinel Necklace 2', 1300, '/products/temptation-spinel-necklace-2.jpg', '18K White Gold, Spinel', 'Spinel necklace', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Temptation Spinel Necklace 3', 1300, '/products/temptation-spinel-necklace-3.jpg', '18K White Gold, Spinel', 'Spinel necklace', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'necklaces'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Lagoon Tourmaline Ring', 3000, '/products/lagoon-tourmaline-ring.jpg', '18K White Gold, Lagoon Tourmaline, Diamond', 'Lagoon tourmaline ring with diamond halo', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'eclat')),
    ('Embrace Tanzanite Ring', 5000, '/products/embrace-tanzanite-ring.jpg', '18K Gold, Tanzanite, Diamond', 'Trinity ring with tanzanite and diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'embrace')),
    ('Embrace Garnet Ring', 6500, '/products/embrace-garnet-ring.jpg', '18K Gold, Mandarin Garnet', 'Mandarin garnet ring', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'embrace')),
    ('Embrace Tanzanite Ring Large', 7000, '/products/embrace-tanzanite-ring-large.jpg', '18K Gold, Tanzanite, Diamond', 'Tanzanite ring with diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'rings'), (SELECT id FROM "Collection" WHERE slug = 'embrace')),
    ('Embrace Tanzanite Earrings', 5000, '/products/embrace-tanzanite-earrings.jpg', '18K Gold, Tanzanite, Diamond', 'Tanzanite earrings with diamonds', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'earrings'), (SELECT id FROM "Collection" WHERE slug = 'embrace')),
    ('Love Chakra Ruby Bracelet', 2000, '/products/love-chakra-ruby-bracelet.jpg', '18K Gold, Ruby, Diamond', 'Ruby bracelet with chakra symbol', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'bracelets'), (SELECT id FROM "Collection" WHERE slug = 'embrace')),
    ('Love Chakra Ruby Bracelet 2', 2500, '/products/love-chakra-ruby-bracelet-2.jpg', '18K Gold, Ruby, Diamond', 'Ruby bracelet with chakra symbol', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'bracelets'), (SELECT id FROM "Collection" WHERE slug = 'embrace')),
    ('Love Chakra Ruby Bracelet 3', 2000, '/products/love-chakra-ruby-bracelet-3.jpg', '18K Gold, Ruby, Diamond', 'Ruby bracelet with chakra symbol', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'bracelets'), (SELECT id FROM "Collection" WHERE slug = 'embrace')),
    ('Love Chakra Ruby Bracelet 4', 2000, '/products/love-chakra-ruby-bracelet-4.jpg', '18K Gold, Ruby, Diamond', 'Ruby bracelet with chakra symbol', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'bracelets'), (SELECT id FROM "Collection" WHERE slug = 'embrace')),
    ('Yalla Bracelet Choker', 2500, '/products/yalla-bracelet-choker.jpg', '18K Gold, Diamond', 'Diamond charm bracelet on velvet ribbon', true, NOW(), NOW(), NOW(), (SELECT id FROM "Category" WHERE slug = 'bracelets'), (SELECT id FROM "Collection" WHERE slug = 'embrace'));

-- ============================================
-- АДМИН ПОЛЬЗОВАТЕЛЬ (пароль: admin123)
-- ============================================
-- Раскомментируй и выполни чтобы создать админа:
-- INSERT INTO "AdminUser" ("id", "email", "passwordHash", "role", "createdAt", "updatedAt")
-- VALUES (
--   gen_random_uuid(),
--   'admin@losawa.com',
--   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- admin123
--   'admin',
--   NOW(),
--   NOW()
-- )
-- ON CONFLICT (email) DO NOTHING;
