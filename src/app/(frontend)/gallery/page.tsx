import { getPayload } from 'payload'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { headers as getHeaders } from 'next/headers.js'

import config from '@/payload.config'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function GalleryPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let user = null
  try {
    const authResult = await payload.auth({ headers })
    user = authResult.user
  } catch (error) {
    console.log('Auth check failed:', error)
  }

  // Fetch all emeralds
  const emeralds = await payload.find({
    collection: 'emeralds',
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" user={user} />

      <main className="pt-20">
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Emerald Gallery</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse our collection of certified Panjshir Valley emeralds. Each stone is scanned,
              graded, and ready for NFT minting.
            </p>
          </div>

          {emeralds.docs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No emeralds available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {emeralds.docs.map((emerald) => (
                <Card key={emerald.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    {emerald.image && typeof emerald.image === 'object' && emerald.image.url ? (
                      <Image
                        src={emerald.image.url}
                        alt={`Emerald ${emerald.stoneId}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant={emerald.minted ? "secondary" : "default"}>
                        {emerald.minted ? "Minted" : "Available"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{emerald.stoneId}</CardTitle>
                    <CardDescription>
                      Grade {emerald.grade} • {emerald.weight}ct
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Origin: {emerald.origin}</p>
                      {emerald.tokenId && <p>Token ID: #{emerald.tokenId}</p>}
                    </div>
                    {!emerald.minted && (
                      <Button asChild className="w-full mt-4">
                        <Link href="/mint">Mint This Emerald</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="link">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}