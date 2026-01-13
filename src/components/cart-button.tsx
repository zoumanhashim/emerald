'use client'

import React from 'react'
import { ShoppingBag } from 'lucide-react'

import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

export const CartButton: React.FC = () => {
  const { toggleCart, getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleCart}
      className="relative h-10 w-10 p-0 hover:bg-gray-50 rounded-full"
    >
      <ShoppingBag className="h-5 w-5 text-gray-600" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-light">
          {totalItems}
        </span>
      )}
    </Button>
  )
}