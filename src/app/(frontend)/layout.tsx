import React from 'react'
import '../globals.css'

export const metadata = {
  description:
    'Reach your target audience by advertising with us. We offer premium ad space to grow your brand.',
  title: 'Your Brand Ads | Premium Advertising Space',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}