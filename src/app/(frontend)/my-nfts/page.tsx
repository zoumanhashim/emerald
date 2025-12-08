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
import { Alert, AlertDescription } from '@/components/ui/alert'

export default async function MyNFTsPage() {
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

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader variant="full" />

        <main className="pt-20">
          <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">My NFTs</h1>
              <Alert className="max-w-md mx-auto">
                <AlertDescription>
                  Please <Link href="/login" className="text-primary hover:underline">sign in</Link> to view your NFTs.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // In a real implementation, you'd track NFT ownership on-chain
  // For now, we'll show all minted emeralds as an example
  const emeralds = await payload.find({
    collection: 'emeralds',
    where: {
      minted: {
        equals: true,
      },
    },
    limit: 50,
    sort: '-createdAt',
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" user={user} />

      <main className="pt-20">
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">My Emerald NFTs</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              View and manage your collection of certified emerald NFTs.
            </p>
          </div>

          {emeralds.docs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't minted any NFTs yet.</p>
              <Button asChild>
                <Link href="/mint">Mint Your First NFT</Link>
              </Button>
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
                      <Badge variant="secondary">Owned</Badge>
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
                      {emerald.ipfsHash && (
                        <p>
                          <a
                            href={`https://ipfs.io/ipfs/${emerald.ipfsHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View on IPFS
                          </a>
                        </p>
                      )}
                    </div>
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