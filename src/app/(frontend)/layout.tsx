import React from 'react'
import { CartProvider } from '@/lib/cart-context'
import { CartSidebar } from '@/components/cart-sidebar'
import { Footer } from '@/components/footer'
import '../globals.css'

export const metadata = {
  title: 'Panjshir Valley Emerald Bridge',
  description: 'Ethically sourced emeralds from the Panjshir Valley.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang='en'>
      <body>
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}