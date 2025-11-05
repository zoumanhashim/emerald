import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

import config from '@/payload.config'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CartButton } from '@/components/cart-button'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { LogoutButton } from '@/components/logout-button'
import { SiteHeader } from '@/components/site-header'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; search?: string }>
}) {
  const { category, sort, search } = await searchParams
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Build where clause for filtering
  const whereClause: any = {
    available: {
      equals: true,
    },
  }

  if (category && category !== 'all') {
    whereClause.category = {
      equals: category,
    }
  }

  if (search) {
    whereClause.name = {
      like: search,
    }
  }

  // Build sort options
  let sortOption = '-createdAt' // Default: newest first
  if (sort === 'price-low') sortOption = 'price'
  else if (sort === 'price-high') sortOption = '-price'
  else if (sort === 'name') sortOption = 'name'

  // Fetch all available apparel items
  const apparel = await payload.find({
    collection: 'snacks',
    where: whereClause,
    depth: 2,
    sort: sortOption,
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Minimal Header */}
      <SiteHeader variant="full" user={user} />

      <main className="relative z-10">
        {/* Hero Section - Minimal */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="space-y-12 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-7xl sm:text-8xl md:text-9xl font-light tracking-tight text-black">
                  SCHIZO
                </h1>
                <div className="h-px w-24 bg-black mx-auto"></div>
                <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                  Minimal apparel for the modern mind
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border border-black rounded-full flex justify-center">
              <div className="w-px h-3 bg-black rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          {/* Collection Section */}
          <section className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-light text-black">Collection</h2>
              <div className="h-px w-16 bg-black mx-auto"></div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search items..."
                    className="pl-10 w-full sm:w-64 bg-white border-gray-200"
                    defaultValue={search || ''}
                  />
                </div>

                {/* Category Filter */}
                <Select defaultValue={category || 'all'}>
                  <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select defaultValue={sort || 'newest'}>
                  <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Results count */}
              <div className="text-sm text-gray-600 font-light">
                {apparel.docs.length} item{apparel.docs.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {apparel.docs.length === 0 ? (
              <div className="text-center py-20">
                <div className="space-y-4">
                  <p className="text-gray-600 text-xl">No items found matching your criteria</p>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {apparel.docs.map((item: any, index: number) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className="group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                          {((item.image && typeof item.image === 'object') || item.imageUrl) && (
                            <Image
                              src={
                                item.image && typeof item.image === 'object'
                                  ? item.image.url
                                  : item.imageUrl
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
                      </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border border-gray-200">
                      <div className="grid md:grid-cols-2">
                        {/* Product Image */}
                        <div className="relative aspect-[3/4] bg-gray-50">
                          {((item.image && typeof item.image === 'object') || item.imageUrl) && (
                            <Image
                              src={
                                item.image && typeof item.image === 'object'
                                  ? item.image.url
                                  : item.imageUrl
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
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-light text-black mb-2">SCHIZO</h3>
              <p className="text-gray-600 text-sm">Minimal apparel for the modern mind</p>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-600">
              <Link href="#" className="hover:text-black transition-colors">About</Link>
              <Link href="#" className="hover:text-black transition-colors">Contact</Link>
              <Link href="#" className="hover:text-black transition-colors">Shipping</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">&copy; 2024 Schizo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}