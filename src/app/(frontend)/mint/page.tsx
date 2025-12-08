'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SiteHeader } from '@/components/site-header'
import { mintNFT, connectWallet } from '@/lib/web3'
import { Loader2, Gem } from 'lucide-react'

export default function MintPage() {
  const [amount, setAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [walletConnected, setWalletConnected] = useState(false)
  const router = useRouter()

  const handleConnectWallet = async () => {
    try {
      await connectWallet()
      setWalletConnected(true)
      setError('')
    } catch (err) {
      setError('Failed to connect wallet. Please install MetaMask.')
    }
  }

  const handleMint = async () => {
    if (!walletConnected) {
      setError('Please connect your wallet first.')
      return
    }

    setIsMinting(true)
    setError('')
    setSuccess('')

    try {
      const tx = await mintNFT(amount)
      setSuccess(`Successfully minted ${amount} TES Emerald NFT(s)! Transaction: ${tx.hash}`)
    } catch (err) {
      setError('Minting failed. Please try again.')
      console.error(err)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" />

      <main className="pt-20">
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Mint Your TES Emerald NFT</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Own a piece of the world&apos;s finest certified emeralds from Panjshir Valley.
              Each NFT represents a real, verified emerald stone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Minting Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gem className="h-5 w-5" />
                  Mint TES Emerald
                </CardTitle>
                <CardDescription>
                  Connect your wallet and mint authentic emerald NFTs backed by physical stones.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {!walletConnected ? (
                  <Button onClick={handleConnectWallet} className="w-full">
                    Connect Wallet
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="amount" className="text-sm font-medium">
                        Number of Emeralds to Mint
                      </label>
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        max="10"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                      />
                    </div>

                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Price per Emerald:</span>
                        <span>15,000 MATIC</span>
                      </div>
                      <div className="flex justify-between font-semibold mt-2">
                        <span>Total:</span>
                        <span>{amount * 15000} MATIC</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleMint}
                      disabled={isMinting}
                      className="w-full"
                    >
                      {isMinting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Minting...
                        </>
                      ) : (
                        `Mint ${amount} Emerald${amount > 1 ? 's' : ''}`
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>About TES Emeralds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Physical Backing</h4>
                  <p className="text-sm text-muted-foreground">
                    Each NFT is backed by a real emerald stone scanned and certified in our lab.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Blockchain Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Immutable records on Polygon blockchain ensure authenticity and provenance.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">IPFS Storage</h4>
                  <p className="text-sm text-muted-foreground">
                    High-resolution images and metadata stored permanently on IPFS.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Limited Supply</h4>
                  <p className="text-sm text-muted-foreground">
                    Only 2,300 emeralds available, matching our Year 1 inventory.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="link">
              <a href="/">← Back to Home</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}