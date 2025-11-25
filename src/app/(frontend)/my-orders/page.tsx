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
import { SiteHeader } from '@/components/site-header'

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

  if (!user) {
    redirect('/login')
  }

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
    <div className="min-h-screen bg-background">
      <SiteHeader variant="full" user={user} />
      <div className="w-full max-w-4xl mx-auto px-4 py-12 pt-32">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Your Orders</h1>
        </div>

        {success && (
          <Alert className="mb-8 border-green-200 bg-green-50 text-green-800">
            <AlertDescription>Order placed successfully! Thank you for your purchase.</AlertDescription>
          </Alert>
        )}

        {orders.docs.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-6 text-lg">
                You haven&apos;t placed any orders yet.
              </p>
              <Button asChild>
                <Link href="/">START SHOPPING</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {orders.docs.map((order: any) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      Order #{String(order.id).slice(-8)}
                    </CardTitle>
                    <Badge
                      variant={
                        order.status === 'pending'
                          ? 'secondary'
                          : order.status === 'completed'
                          ? 'default'
                          : 'destructive'
                      }
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>
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
                      <div key={index} className="flex items-center gap-6">
                        {item.snack &&
                          typeof item.snack === 'object' &&
                          ((item.snack.image &&
                            typeof item.snack.image === 'object' &&
                            item.snack.image.url) ||
                            item.snack.imageUrl) && (
                            <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted/50">
                              <Image
                                src={item.snack.image?.url || item.snack.imageUrl}
                                alt={item.snack.image?.alt || item.snack.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        <div className="flex-1">
                          <h4 className="font-semibold">
                            {item.snack?.name || 'Unknown Item'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Price: ${(item.snack?.price * item.quantity || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="text-right">
                    <span className="text-xl font-semibold">
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