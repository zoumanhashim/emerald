import React from 'react'
import '../globals.css'

export const metadata = {
  description: 'A sponsorship project to provide warm hoodies to people sleeping rough.',
  title: 'Hoodies for Warmth',
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