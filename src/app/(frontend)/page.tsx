import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { SiteHeader } from '@/components/site-header'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const emeralds = await payload.find({
    collection: 'emeralds',
    where: {
      available: {
        equals: true,
      },
    },
    sort: 'createdAt',
    depth: 2,
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="full" user={user} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32 text-center bg-muted/50 border-b border-border">
          <div className="w-full max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary">The Emerald Bridge</h1>
            <p className="mt-6 text-lg text-foreground/80 max-w-2xl mx-auto">
              Connecting the historic Panjshir Valley to the world. Discover ethically sourced,
              high-quality emeralds with a story as rich as their color.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="#collection">Explore the Collection</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Collection Section */}
        <section id="collection" className="py-16 md:py-24">
          <div className="w-full max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Collection</h2>
            {emeralds.docs.length === 0 ? (
              <div className="text-center py-20 border border-border rounded-lg">
                <h3 className="text-2xl font-semibold">Coming Soon</h3>
                <p className="mt-4 text-muted-foreground">
                  New emeralds will be available soon. Please check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {emeralds.docs.map((item: any) => {
                  const imageUrl =
                    item.image && typeof item.image === 'object' && item.image.url
                      ? item.image.url
                      : item.imageUrl
                  const imageAlt =
                    item.image && typeof item.image === 'object' && item.image.alt
                      ? item.image.alt
                      : item.name

                  return (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <div className="group cursor-pointer text-center border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                          <div className="bg-muted/30 aspect-square flex items-center justify-center">
                            <div className="relative w-full h-full">
                              {imageUrl && (
                                <Image
                                  src={imageUrl}
                                  alt={imageAlt}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              )}
                            </div>
                          </div>
                          <div className="p-4 bg-background">
                            <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                            <p className="text-primary font-bold mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="bg-background border-border p-0 max-w-4xl shadow-2xl rounded-lg">
                        <div className="grid md:grid-cols-2 gap-0">
                          {/* Product Image */}
                          <div className="relative aspect-square bg-muted/30">
                            {imageUrl && (
                              <Image src={imageUrl} alt={imageAlt} fill className="object-contain" />
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="p-8 flex flex-col">
                            <DialogHeader>
                              <DialogTitle className="text-3xl font-bold text-secondary">
                                {item.name}
                              </DialogTitle>
                              <DialogDescription className="text-muted-foreground uppercase text-sm tracking-widest pt-1">
                                {item.category}
                              </DialogDescription>
                            </DialogHeader>

                            <p className="text-foreground/80 mt-4 leading-relaxed flex-grow">
                              {item.description}
                            </p>

                            <div className="mt-6 space-y-2 text-sm">
                              <p>
                                <strong>Carat:</strong> {item.details.caratWeight} ct
                              </p>
                              <p>
                                <strong>Dimensions:</strong> {item.details.dimensions} mm
                              </p>
                              <p>
                                <strong>Clarity:</strong> {item.details.clarity}
                              </p>
                              <p>
                                <strong>Origin:</strong> {item.details.origin}
                              </p>
                              {item.details.certification && (
                                <p>
                                  <strong>Certification:</strong> {item.details.certification}
                                </p>
                              )}
                            </div>

                            <div className="mt-6">
                              <p className="text-3xl font-bold text-primary">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>

                            <div className="mt-6">
                              {user ? (
                                <AddToCartButton snack={item} />
                              ) : (
                                <Button
                                  asChild
                                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                  size="lg"
                                >
                                  <Link href="/login">Sign In to Purchase</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}