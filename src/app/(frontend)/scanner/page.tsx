import React from 'react'
import Link from 'next/link'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Camera, Upload, Database, CheckCircle } from 'lucide-react'

export default async function ScannerPage() {
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

  // Only allow admins to access this page
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader variant="full" />

        <main className="pt-20">
          <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
              <Alert variant="destructive" className="max-w-md mx-auto">
                <AlertDescription>
                  This page is only accessible to administrators.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Get recent emerald scans
  const recentEmeralds = await payload.find({
    collection: 'emeralds',
    limit: 10,
    sort: '-createdAt',
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" user={user} />

      <main className="pt-20">
        <div className="w-full max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Emerald Scanner</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Use our hardware bridge to scan and certify physical emerald stones.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Scanner Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Hardware Setup
                </CardTitle>
                <CardDescription>
                  Instructions for setting up and using the emerald scanner.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <p className="font-medium">Connect Microscope</p>
                      <p className="text-sm text-muted-foreground">
                        Attach your digital microscope or high-res camera to the lab computer.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <p className="font-medium">Run Scanner Script</p>
                      <p className="text-sm text-muted-foreground">
                        Execute the Python script: <code className="bg-secondary px-1 rounded">python scanner_client.py</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <p className="font-medium">Position Emerald</p>
                      <p className="text-sm text-muted-foreground">
                        Place the emerald under the microscope and align for optimal capture.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <p className="font-medium">Capture & Upload</p>
                      <p className="text-sm text-muted-foreground">
                        Press SPACEBAR to capture. The system will automatically upload to IPFS and create NFT metadata.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Ensure the API endpoint in the script matches your deployment URL.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Recent Scans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Recent Scans
                </CardTitle>
                <CardDescription>
                  Latest emerald certifications added to the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentEmeralds.docs.length === 0 ? (
                  <p className="text-muted-foreground">No scans yet.</p>
                ) : (
                  <div className="space-y-3">
                    {recentEmeralds.docs.map((emerald) => (
                      <div key={emerald.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{emerald.stoneId}</p>
                          <p className="text-sm text-muted-foreground">
                            {emerald.weight}ct • Grade {emerald.grade}
                          </p>
                        </div>
                        <Badge variant={emerald.minted ? "secondary" : "default"}>
                          {emerald.minted ? "Minted" : "Ready"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
              <CardDescription>
                System requirements and API details for the scanner integration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Hardware Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Digital microscope or high-resolution camera</li>
                    <li>• USB connection to lab computer</li>
                    <li>• Stable internet connection</li>
                    <li>• Python 3.8+ with OpenCV</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">API Endpoint</h4>
                  <div className="text-sm">
                    <p className="font-mono bg-secondary p-2 rounded">
                      POST /api/ingest
                    </p>
                    <p className="text-muted-foreground mt-1">
                      Accepts: stoneId, weight, grade, origin, image file
                    </p>
                  </div>
                </div>
              </div>

              <Alert>
                <Upload className="h-4 w-4" />
                <AlertDescription>
                  Images are automatically uploaded to IPFS and metadata is generated for NFT minting.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Button asChild variant="link">
              <Link href="/admin">← Back to Admin Panel</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}