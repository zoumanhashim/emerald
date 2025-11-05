'use client'

import React, { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Filter, X } from 'lucide-react'

interface ItemFiltersProps {
  categories?: Array<{ value: string; label: string }>
  sortOptions?: Array<{ value: string; label: string }>
  resultsCount?: number
  className?: string
}

export const ItemFilters: React.FC<ItemFiltersProps> = ({
  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
  ],
  sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
  ],
  resultsCount,
  className = '',
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentCategory = searchParams.get('category') || 'all'
  const currentSort = searchParams.get('sort') || 'newest'
  const currentSearch = searchParams.get('search') || ''

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'newest') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false })
    })
  }

  const clearFilters = () => {
    startTransition(() => {
      router.push(window.location.pathname, { scroll: false })
    })
  }

  const hasActiveFilters = currentCategory !== 'all' || currentSort !== 'newest' || currentSearch

  return (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search items..."
              className="pl-10 w-full lg:w-64 bg-white border-gray-200"
              value={currentSearch}
              onChange={(e) => updateFilters({ search: e.target.value })}
            />
          </div>

          {/* Category Filter */}
          <Select
            value={currentCategory}
            onValueChange={(value) => updateFilters({ category: value })}
          >
            <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={currentSort}
            onValueChange={(value) => updateFilters({ sort: value })}
          >
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

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-2 bg-white border-gray-200 hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Results count */}
        {resultsCount !== undefined && (
          <div className="text-sm text-gray-600 font-light">
            {resultsCount} item{resultsCount !== 1 ? 's' : ''} found
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="mt-4 text-sm text-gray-500">
          Updating results...
        </div>
      )}
    </div>
  )
}