'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@/lib/web3'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

interface OwnedNFT {
  tokenId: string
  name?: string
  description?: string
  image?: {
    cachedUrl?: string
    originalUrl?: string
  }
  raw: {
    metadata: {
      attributes?: Array<{
        trait_type: string
        value: string | number
      }>
    }
  }
}

export default function MyNFTsPage() {
  const { address, isConnected } = useWallet()
  const [nfts, setNfts] = useState<OwnedNFT[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isConnected && address) {
      fetchOwnedNFTs()
    }
  }, [isConnected, address])

  const fetchOwnedNFTs = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/alchemy?owner=${address}`)
      if (!response.ok) {
        throw new Error('Failed to fetch NFTs')
      }

      const data = await response.json()
      setNfts(data.ownedNFTs)
    } catch (err) {
      setError('Failed to load your NFTs. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader variant="full" />

        <main className="pt-20">
          <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">My NFTs</h1>
              <Alert className="max-w-md mx-auto mb-6">
                <AlertDescription>
                  Connect your wallet to view your emerald NFT collection.
                </AlertDescription>
              </Alert>
              <ConnectButton />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" />

      <main className="pt-20">
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">My Emerald NFTs</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              View and manage your collection of certified emerald NFTs.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="max-w-md mx-auto mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && nfts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't minted any NFTs yet.</p>
              <Button asChild>
                <Link href="/mint">Mint Your First NFT</Link>
              </Button>
            </div>
          )}

          {!loading && nfts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <Card key={nft.tokenId} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    {nft.image?.cachedUrl || nft.image?.originalUrl ? (
                      <Image
                        src={nft.image.cachedUrl || nft.image.originalUrl!}
                        alt={nft.name || `Emerald #${nft.tokenId}`}
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
                    <CardTitle className="text-lg">
                      {nft.name || `TES Emerald #${nft.tokenId}`}
                    </CardTitle>
                    <CardDescription>
                      Token ID: #{nft.tokenId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {nft.raw.metadata.attributes?.map((attr, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{attr.trait_type}:</span>
                          <span className="font-medium">{attr.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <a
                          href={`https://opensea.io/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${nft.tokenId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on OpenSea
                        </a>
                      </Button>
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