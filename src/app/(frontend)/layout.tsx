import React from 'react'
import '../globals.css'
import { Providers } from '@/components/providers'

export const metadata = {
  description:
    "Own authenticated Panjshir Valley emeralds through blockchain certification. Each NFT represents a real, scanned emerald stone.",
  title: 'The Emerald Standard | Blockchain Emerald NFTs',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}