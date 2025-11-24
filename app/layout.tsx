import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AffiliateHub - Best Deals & Products Online',
  description: 'Discover amazing products and deals from top brands. Your trusted source for affiliate marketing and product recommendations.',
  keywords: 'affiliate marketing, deals, products, shopping, discounts',
  authors: [{ name: 'AffiliateHub Team' }],
  creator: 'AffiliateHub',
  publisher: 'AffiliateHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}