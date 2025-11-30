import React from 'react'
import '../globals.css'

export const metadata = {
  description:
    "We print your brand's logo on high-quality hoodies and distribute them to the homeless. A powerful way to give back and build your brand story.",
  title: 'Brand for Good | Meaningful Merch for the Homeless',
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