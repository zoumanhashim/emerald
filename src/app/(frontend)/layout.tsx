import React from 'react'
import { CartProvider } from '@/lib/cart-context'
import { CartSidebar } from '@/components/cart-sidebar'
import '../globals.css'

export const metadata = {
  title: 'Panjshir Valley Emerald Bridge',
  description: 'Ethically sourced emeralds from the Panjshir Valley.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <main>{children}</main>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )