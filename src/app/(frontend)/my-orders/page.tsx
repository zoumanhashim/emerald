import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import config from '@/payload.config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

export default async function MyOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const { success } = await searchParams
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login')
  }

  // Fetch user's orders
  const orders = await payload.find({
    collection: 'orders',
    where: {
      user: {
        equals: user.id,
      },
    },
    depth: 3,
    sort: '-orderDate',
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <Button asChild variant="ghost" className="mb-6 text-sm font-light hover:bg-gray-50">
            <Link href="/">← BACK TO SHOP</Link>
          </Button>
          <h1 className="text-4xl font-light text-black">Your Orders</h1>
        </div>

        {success && (
          <Alert className="mb-8 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">Order placed successfully! Thank you for shopping with Schizo.</AlertDescription>
          </Alert>
        )}

        {orders.docs.length === 0 ? (
          <Card className="border-gray-200">
            <CardContent className="py-16 text-center">
              <p className="text-gray-600 mb-6 text-lg">You haven&apos;t placed any orders yet.</p>
              <Button asChild className="bg-black hover:bg-gray-800 text-white border-0 text-sm font-light tracking-wider px-8 py-3">
                <Link href="/">START SHOPPING</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {orders.docs.map((order: any) => (
              <Card key={order.id} className="border-gray-200 overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-light text-black">Order #{String(order.id).slice(-8)}</CardTitle>
                    <Badge
                      variant={
                        order.status === 'pending'
                          ? 'secondary'
                          : order.status === 'completed'
                            ? 'default'
                            : 'destructive'
                      }
                      className="text-xs font-light"
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-6">
                    {order.items.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-6 p-4 border border-gray-100 rounded-lg"
                      >
                        {item.product &&
                          typeof item.product === 'object' &&
                          item.product.image &&
                          typeof item.product.image === 'object' &&
                          item.product.image.url && (
                            <div className="relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                              <Image
                                src={item.product.image.url}
                                alt={item.product.image.alt || item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        <div className="flex-1">
                          <h4 className="font-light text-black text-lg">{item.product?.name || 'Unknown Item'}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-600">
                            Price: ${(item.product?.price * item.quantity || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6 bg-gray-200" />

                  <div className="text-right">
                    <span className="text-xl font-light text-black">
                      Total: ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}