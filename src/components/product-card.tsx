'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Gem } from 'lucide-react'
import { AddToCartButton } from './add-to-cart-button'
import type { Emerald } from '@/payload-types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  emerald: Emerald
}

export const ProductCard: React.FC<ProductCardProps> = ({ emerald }) => {
  const imageUrl =
    (typeof emerald.image === 'object' && emerald.image?.url) || emerald.imageUrl || ''

  const snackForButton = {
    id: emerald.id.toString(),
    name: emerald.name,
    price: emerald.price,
    category: emerald.category,
    image:
      typeof emerald.image === 'object' && emerald.image?.url
        ? { url: emerald.image.url, alt: emerald.image.alt }
        : imageUrl
        ? { url: imageUrl, alt: emerald.name }
        : undefined,
  }

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/`}>
          <div className="aspect-square relative bg-muted/50 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={typeof emerald.image === 'object' ? emerald.image?.alt || emerald.name : emerald.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Gem className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold leading-tight">
            <Link href={`/`} className="hover:text-primary transition-colors">
              {emerald.name}
            </Link>
          </CardTitle>
          <Badge variant="secondary" className="capitalize flex-shrink-0">
            {emerald.category}
          </Badge>
        </div>
        <p className="text-xl font-bold text-primary mt-2">${emerald.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton snack={snackForButton} />
      </CardFooter>
    </Card>
  )
}