export interface Collection {
  id: string
  name: string
  description: string
  image: string
  fullDescription?: string
  quote?: string
  subtitle?: string
}

export const collections: Collection[] = [
  {
    id: 'cleopatra',
    name: 'Cleopatra',
    description: 'Egyptian-inspired designs embodying feminine strength and regal allure',
    image: '/products/1.jpg',
    quote: 'In Egypt\'s land where the Nile winds its way,\nCleopatra danced, in twilight\'s soft array.\nHer beauty, a mystery, veiled in grace,\nA queen whose name time won\'t erase...',
    fullDescription: 'The Cleopatra Collection is a mystical ensemble of fine jewelry that transcends time, drawing inspiration from the enduring allure of ancient Egyptian culture and the legendary queen herself. Whether it\'s a bold statement ring, talisman pendant, or delicate earrings that evoke an air of seduction, every design in the Cleopatra Collection embodies the spirit of this legendary queen, echoing stories of ancient wisdom and mysticism.',
  },
  {
    id: 'jacqueline',
    name: 'Jacqueline',
    description: 'Vintage 60s glamour with modern luxury and sophisticated charm',
    image: '/products/14.jpg',
    subtitle: 'Timeless Elegance of the 1960s: The Jacqueline Kennedy-Inspired Collection',
    fullDescription: 'Immerse yourself in the allure of the 1960s with our elegant avant-garde creations. This collection pays homage to Jackie\'s charm and style, bringing it to life through a fusion of unconventional design decisions, bold shapes, and daring color palettes. Each piece invites you to celebrate the spirit of this transformative decade, resonating with the energy of change and self-expression. Adorn yourself in the nostalgia of an era that reshaped fashion and let the Jacqueline Collection guide you in expressing timeless elegance with a modern twist.',
  },
  {
    id: 'eclat',
    name: 'Éclat',
    description: 'Timeless elegance featuring vibrant gemstones and refined craftsmanship',
    image: '/products/22.jpg',
    fullDescription: 'Step into the realm of timeless allure with our Éclat Collection, a symbol of refined style for those seeking the perfect blend of tradition and contemporary flair. This collection accentuates the ethereal aura of cold-palette gemstones, selected for their exceptional brilliance and distinctive charm. Evoking the celestial essence of beauty. Elegance and modernity meet in each piece, tailored to confident women who appreciate bold sophistication.',
  },
  {
    id: 'embrace',
    name: 'Embrace',
    description: 'Sophisticated designs celebrating love and connection with exquisite gemstones',
    image: '/products/34.jpg',
    fullDescription: 'The Embrace Collection, infused with sincerity, is inspired by the profound journey to self-love, appreciation, and inner strength. Rooted in the principles of self-love and acceptance, each meticulously crafted piece is a tangible expression of the wearer\'s voyage of self-discovery. This collection redefines traditional jewelry into a wearable celebration of inner worth, offering symbolic designs. From the intricate "Yalla" bracelets, symbolizing personal growth and confidence, to the elegantly crafted rings and earrings that lovingly "embrace" you, each piece in this collection speaks of enduring love and personal empowerment.',
  },
]
