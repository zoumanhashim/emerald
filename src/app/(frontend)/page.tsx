import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { Camera, MapPin, Upload, Gem } from 'lucide-react'

import config from '@/payload.config'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let user = null
  try {
    const authResult = await payload.auth({ headers })
    user = authResult.user
  } catch (error) {
    // Auth failed, user remains null - this is expected for unauthenticated users
    console.log('Auth check failed:', error)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" user={user} />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold mb-6">
                  The Emerald Standard
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Own authenticated Panjshir Valley emeralds through blockchain certification.
                  Each NFT represents a real, scanned emerald stone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link href="/mint">Mint Your Emerald NFT</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/info">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src="/emerald-placeholder.png"
                  alt="High-quality emerald stone"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Process and Pricing Section */}
        <section id="process-and-pricing" className="relative py-16 md:py-24 bg-secondary">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">From Mine to Blockchain</h2>
              <p className="mt-4 text-muted-foreground">
                Our rigorous process ensures every emerald is authenticated, scanned, and tokenized.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
              <div className="p-6 border rounded-lg bg-card">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <MapPin className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Source & Grade</h3>
                <p className="mt-2 text-muted-foreground">
                  Premium emeralds sourced from Panjshir Valley, graded by expert gemologists.
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Camera className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Scan & Upload</h3>
                <p className="mt-2 text-muted-foreground">
                  High-resolution microscopic scans uploaded to IPFS for permanent storage.
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Gem className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Mint NFT</h3>
                <p className="mt-2 text-muted-foreground">
                  Tokenize your emerald on Polygon blockchain with immutable provenance.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Card className="max-w-md w-full border-primary bg-card">
                <CardHeader>
                  <CardTitle>Premium Emerald NFT</CardTitle>
                  <CardDescription className="text-4xl font-bold pt-4">
                    15,000 <span className="text-lg font-normal text-muted-foreground">MATIC</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Physical Emerald Backing
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>High-Resolution IPFS Images
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Blockchain Provenance
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Expert Certification
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Limited to 2,300 Stones
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/mint">Start Minting</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t">
          <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} The Emerald Standard. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}