import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { Camera, MapPin, Upload } from 'lucide-react'

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
        <section className="bg-transparent pt-20">
          <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <p className="mt-6 text-lg text-gray-100">
                  We customize premium hoodies with your brand's logo and deliver them directly to people experiencing homelessness in the Indian city you choose, helping them stay warm through harsh winters.
                </p>
                <p className="mt-4 text-sm text-gray-300">
                  Only India metro cities
                </p>
              </div>
              <div>
                <Image
                  src="/hoodie-mockup.jpg"
                  alt="Hoodie with 'your ad here' text"
                  width={1200}
                  height={800}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">A Simple, Transparent Process</h2>
              <p className="mt-4 text-gray-300">
                Making a difference has never been easier.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 border border-gray-600 rounded-lg bg-gray-800/50">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <MapPin className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">Choose City & Quantity</h3>
                <p className="mt-2 text-gray-300">
                  Select where you want to make an impact and how many hoodies you&apos;d like to donate.
                </p>
              </div>
              <div className="p-6 border border-gray-600 rounded-lg bg-gray-800/50">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Upload className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">Upload Your Logo</h3>
                <p className="mt-2 text-gray-300">
                  Provide us with your brand logo, and we&apos;ll handle the high-quality printing.
                </p>
              </div>
              <div className="p-6 border border-gray-600 rounded-lg bg-gray-800/50">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Camera className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">We Distribute & Document</h3>
                <p className="mt-2 text-gray-300">
                  Our team distributes the hoodies and captures photos/videos of the event for your
                  brand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-transparent py-16 md:py-24">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Transparent Pricing</h2>
              <p className="mt-4 text-gray-300">
                One simple price per hoodie. Everything included.
              </p>
            </div>
            <div className="flex justify-center">
              <Card className="max-w-md w-full border-primary bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-white">All-Inclusive Package</CardTitle>
                  <CardDescription className="text-4xl font-bold pt-4 text-white">
                    ₹500 <span className="text-lg font-normal text-gray-300">/ hoodie</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>High-Quality 430 GSM Hoodie
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Professional Logo Printing
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Distribution in Your Chosen
                      City
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Photos & Media of
                      Distribution
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>A Heartwarming Brand Story
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/start-campaign">Start Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="w-full max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Contact Us</h2>
            <div className="mt-4 space-y-2 text-gray-300">
              <p>WhatsApp: +91 8400452650</p>
              <p>Head Office: Lucknow, Uttar Pradesh</p>
              <p>Operations: All over India</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-600">
          <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Those Who Struggle. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}