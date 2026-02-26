import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import localFont from 'next/font/local'

const forum = localFont({
  src: '../fonts/Forum-Regular.ttf',
  variable: '--font-forum',
  display: 'swap',
})

const bonVivant = localFont({
  src: [
    {
      path: '../fonts/BonVivant-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BonVivantSerif.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BonVivantSerifBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-bon-vivant',
  display: 'swap',
})

const casta = localFont({
  src: '../fonts/FontsFree-Net-Casta-Thin.ttf',
  variable: '--font-casta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Losawa - Fine Jewelry',
  description: 'Exclusive premium fine jewelry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${forum.variable} ${bonVivant.variable} ${casta.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
