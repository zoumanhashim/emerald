import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { SiteHeader } from '@/components/site-header'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Fetch snacks (apparel items)
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
    <div className="min-h-screen bg-white">
      <SiteHeader variant="full" user={user} />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-light text-black tracking-tight animate-fade-in">
                SCHIZO
              </h1>
              <div className="h-px w-24 bg-black mx-auto"></div>
              <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide animate-fade-in animation-delay-1000">
                Minimal fashion for the modern individual
              </p>
            </div>

            <div className="pt-8 animate-fade-in animation-delay-2000">
              <Button
                asChild
                className="bg-black hover:bg-gray-800 text-white border-0 px-8 py-4 text-sm font-light tracking-wider"
              >
                <Link href="#collection">EXPLORE COLLECTION</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Collection Section */}
        <section id="collection" className="space-y-16 py-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light text-black">Collection</h2>
            <div className="h-px w-16 bg-black mx-auto"></div>
          </div>

          {snacks.docs.length === 0 ? (
            <div className="text-center py-20">
              <div className="space-y-4">
                <p className="text-gray-600 text-xl">New arrivals coming soon</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Shelf Container */}
              <div className="bg-gray-50 border border-gray-200 p-8 overflow-x-auto">
                <div className="flex gap-8 min-w-max pb-4">
                  {snacks.docs.map((item: any, index: number) => (
                    <Link key={item.id} href={`/snack/${item.id}`} className="group cursor-pointer flex-shrink-0">
                      <div className="relative w-64 h-80 overflow-hidden bg-white border border-gray-200 shadow-sm">
                        {((item.image && typeof item.image === 'object') || item.imageUrl) && (
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
                            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="mt-4 space-y-2 text-center">
                        <h3 className="text-sm font-light text-black group-hover:text-gray-600 transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-light uppercase tracking-wider">{item.category}</p>
                        <p className="text-sm font-medium text-black">${item.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Shelf Base */}
              <div className="h-2 bg-gray-800 border-t border-gray-600"></div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}