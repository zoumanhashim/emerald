'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AddToCartButton } from '@/components/add-to-cart-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Item {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: {
    url: string
    alt?: string
  } | null
  imageUrl?: string | null
}

interface ItemGridProps {
  items: Item[]
  user?: any
  columns?: 1 | 2 | 3 | 4
  showQuickView?: boolean
}

export const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  user,
  columns = 4,
  showQuickView = true,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="space-y-4">
          <p className="text-gray-600 text-xl">No items found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {items.map((item) => (
        <div key={item.id} className="group">
          {showQuickView ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <ItemCard item={item} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border border-gray-200">
                <ItemQuickView item={item} user={user} />
              </DialogContent>
            </Dialog>
          ) : (
            <Link href={`/snack/${item.id}`}>
              <ItemCard item={item} />
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

interface ItemCardProps {
  item: Item
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <>
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
        {((item.image && typeof item.image === 'object') || item.imageUrl) && (
          <Image
            src={
              item.image && typeof item.image === 'object'
                ? item.image.url
                : item.imageUrl!
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
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-light text-black group-hover:text-gray-600 transition-colors duration-300">
            {item.name}
          </h3>
          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
            {item.category}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 font-light line-clamp-2">
          {item.description}
        </p>
        <p className="text-lg font-medium text-black">${item.price.toFixed(2)}</p>
      </div>
    </>
  )
}

interface ItemQuickViewProps {
  item: Item
  user?: any
}

const ItemQuickView: React.FC<ItemQuickViewProps> = ({ item, user }) => {
  return (
    <div className="grid md:grid-cols-2">
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-gray-50">
        {((item.image && typeof item.image === 'object') || item.imageUrl) && (
          <Image
            src={
              item.image && typeof item.image === 'object'
                ? item.image.url
                : item.imageUrl!
            }
            alt={
              (item.image && typeof item.image === 'object'
                ? item.image.alt
                : undefined) || item.name
            }
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="p-12 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              {item.category}
            </Badge>
          </div>
          <h2 className="text-3xl font-light text-black">{item.name}</h2>
          <div className="h-px w-12 bg-black"></div>
          <p className="text-gray-600 leading-relaxed">{item.description}</p>
        </div>

        <div className="space-y-2">
          <p className="text-2xl font-medium text-black">${item.price.toFixed(2)}</p>
        </div>

        <div className="pt-8">
          {user ? (
            <AddToCartButton snack={item} />
          ) : (
            <Button
              asChild
              className="w-full bg-black hover:bg-gray-800 text-white border-0 py-4 text-sm font-light tracking-wider"
            >
              <Link href="/login">SIGN IN TO PURCHASE</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}