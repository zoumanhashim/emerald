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
import { Badge } from '@/components/ui/badge'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const products = await payload.find({
    collection: 'products',
    where: {
      available: {
        equals: true,
      },
    },
    sort: 'createdAt',
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="full" user={user} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="w-full max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl">those who strugle</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              limited quantity crypto only
            </p>
          </div>
        </section>

        {/* Collection Section */}
        <section id="collection" className="py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto px-4">
            {products.docs.length === 0 ? (
              <div className="text-center py-20 border rounded-lg p-8">
                <h2 className="text-2xl">No products available...</h2>
                <p className="mt-4 text-muted-foreground">New items will be available soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.docs.map((item: any) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className="group cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                        <div className="aspect-square bg-muted flex items-center justify-center p-4">
                          <div className="relative w-full h-full">
                            {((item.image && typeof item.image === 'object') ||
                              item.imageUrl) && (
                              <Image
                                src={
                                  item.image && typeof item.image === 'object'
                                    ? item.image.url
                                    : item.imageUrl
                                }
                                alt={
                                  (item.image && typeof item.image === 'object'
                                    ? item.image.alt
                                    : undefined) || item.name
                                }
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                        </div>
                        <div className="p-4 border-t">
                          <h3 className="font-semibold truncate">{item.name}</h3>
                          <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="bg-card max-w-4xl">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-muted rounded-lg">
                          {((item.image && typeof item.image === 'object') ||
                            item.imageUrl) && (
                            <Image
                              src={
                                item.image && typeof item.image === 'object'
                                  ? item.image.url
                                  : item.imageUrl
                              }
                              alt={
                                (item.image && typeof item.image === 'object'
                                  ? item.image.alt
                                  : undefined) || item.name
                              }
                              fill
                              className="object-contain"
                            />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col h-full py-6">
                          <DialogHeader>
                            <DialogTitle className="text-3xl">
                              {item.name}
                            </DialogTitle>
                            <DialogDescription className="pt-1">
                              <Badge>{item.category}</Badge>
                            </DialogDescription>
                          </DialogHeader>

                          <p className="text-muted-foreground mt-4 leading-relaxed flex-grow">
                            {item.description}
                          </p>

                          <div className="mt-6">
                            <p className="text-4xl font-bold">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-6">
                            {user ? (
                              <AddToCartButton product={item} />
                            ) : (
                              <Button asChild size="lg" className="w-full">
                                <Link href="/login">Sign In to Purchase</Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}