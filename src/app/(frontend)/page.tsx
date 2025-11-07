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

  const snacks = await payload.find({
    collection: 'snacks',
    where: {
      available: {
        equals: true,
      },
    },
    sort: 'createdAt',
  })

  return (
    <div className="min-h-screen">
      <SiteHeader variant="full" user={user} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center bg-black/20 border-b-4 border-black/50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl text-white">Auction House</h1>
            <p className="mt-4 text-xl text-stone-300 max-w-2xl mx-auto">
              Browse our collection of rare and valuable items.
            </p>
            <p className="mt-6 text-lg text-yellow-300 tracking-wider font-bold">
              limited quantity crypto only
            </p>
          </div>
        </section>

        {/* Collection Section */}
        <section id="collection" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {snacks.docs.length === 0 ? (
              <div className="text-center py-20 bg-black/20 border-2 border-stone-900 p-8">
                <h2 className="text-2xl">Restocking...</h2>
                <p className="mt-4 text-stone-300">New items will be available soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                {snacks.docs.map((item: any) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className="group cursor-pointer text-center">
                        <div className="bg-black/30 border-2 border-t-stone-600 border-l-stone-600 border-b-stone-900 border-r-stone-900 p-2 aspect-square flex items-center justify-center transition-colors duration-200 hover:bg-white/10">
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
                                className="object-cover"
                                style={{ imageRendering: 'pixelated' }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <p className="text-sm text-white bg-black/70 px-2 py-1 inline-block">
                            {item.name}
                          </p>
                          <p className="text-xs text-yellow-300 bg-black/70 px-2 py-1 inline-block">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="bg-stone-800 border-4 border-t-stone-600 border-l-stone-600 border-b-stone-900 border-r-stone-900 p-0 max-w-3xl text-white shadow-2xl">
                      <div
                        className="absolute inset-0 bg-repeat opacity-10"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                          backgroundSize: '4px 4px',
                        }}
                      />
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-black/30 border-r-4 border-black/50 p-4">
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
                              className="object-cover"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="p-6 flex flex-col">
                          <DialogHeader>
                            <DialogTitle className="text-2xl text-yellow-300">
                              {item.name}
                            </DialogTitle>
                            <DialogDescription className="text-stone-400 uppercase text-xs tracking-widest pt-1">
                              {item.category}
                            </DialogDescription>
                          </DialogHeader>

                          <p className="text-stone-300 mt-4 leading-relaxed flex-grow">
                            {item.description}
                          </p>

                          <div className="mt-6">
                            <p className="text-3xl font-bold text-white">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-6">
                            {user ? (
                              <AddToCartButton snack={item} />
                            ) : (
                              <Button
                                asChild
                                className="w-full bg-green-600 text-white border-2 border-t-green-500 border-l-green-500 border-b-green-800 border-r-green-800 hover:bg-green-700 active:border-t-green-800 active:border-l-green-800 active:border-b-green-500 active-border-r-green-500 rounded-none py-3 text-base"
                              >
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