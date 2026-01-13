import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

async function getProduct(id: string, payload: any) {
  const product = await payload.findByID({
    collection: 'products',
    id,
    depth: 2,
  })
  return product
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const product = await getProduct(id, payload)

  if (!product) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            {((product.image && typeof product.image === 'object') || product.imageUrl) && (
              <div className="aspect-square relative rounded-lg overflow-hidden border">
                <Image
                  src={
                    product.image && typeof product.image === 'object'
                      ? product.image.url
                      : product.imageUrl
                  }
                  alt={
                    (product.image && typeof product.image === 'object'
                      ? product.image.alt
                      : undefined) || product.name
                  }
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <p className="text-lg text-gray-700 mt-4">{product.description}</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-green-600">${product.price.toFixed(2)}</span>
            </div>
            <div className="mt-8">
              {user ? (
                <AddToCartButton product={product} />
              ) : (
                <Button asChild>
                  <Link href="/login">Login to Order</Link>
                </Button>
              )}
            </div>
            <div className="mt-4">
              <Button asChild variant="link">
                <Link href="/"> &larr; Back to all products</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}