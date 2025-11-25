import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { Gem, ShieldCheck, Truck } from 'lucide-react'
import { Emerald } from '@/payload-types'

export default async function HomePage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const featuredEmeralds = await payload.find({
    collection: 'emeralds',
    limit: 3,
    depth: 1,
    where: {
      available: {
        equals: true,
      },
    },
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="full" user={user} />

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] md:h-[70vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1589137215899-a7101a3431a8?q=80&w=2070&auto=format&fit=crop"
            alt="Panjshir Valley landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 w-full max-w-4xl mx-auto px-4">
            <h1
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Emerald Bridge
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Connecting the historic Panjshir Valley to the world with ethically sourced,
              high-quality emeralds.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="#featured">Shop Now</Link>
            </Button>
          </div>
        </section>

        {/* Featured Emeralds Section */}
        <section id="featured" className="py-16 md:py-24 bg-muted/50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">Featured Emeralds</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Handpicked for exceptional quality and beauty.
              </p>
            </div>
            {featuredEmeralds.docs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEmeralds.docs.map((emerald) => (
                  <ProductCard key={emerald.id} emerald={emerald as Emerald} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No featured emeralds available at the moment.
              </p>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">Our Promise</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Authenticity and quality you can trust.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Gem className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Ethically Sourced</h3>
                <p className="mt-2 text-muted-foreground">
                  Directly from the Panjshir Valley, ensuring fair practices and supporting local
                  communities.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Certified Quality</h3>
                <p className="mt-2 text-muted-foreground">
                  Each emerald is carefully inspected and comes with options for certification from
                  leading labs.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Secure Shipping</h3>
                <p className="mt-2 text-muted-foreground">
                  Insured, reliable, and discreet worldwide shipping to protect your valuable
                  investment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}