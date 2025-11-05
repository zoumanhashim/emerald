'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'

import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/lib/cart-context'

interface AddToCartButtonProps {
  snack: {
    id: string
    name: string
    price: number
    category: string
    image?: {
      url: string
      alt?: string
    }
  }
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ snack }) => {
  const { addItem, openCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: snack.id,
      name: snack.name,
      price: snack.price,
      category: snack.category,
      image: snack.image,
    })

    setIsAdded(true)

    // Show feedback for 1 second
    setTimeout(() => {
      setIsAdded(false)
    }, 1000)

    // Optional: Open cart after adding item
    // openCart()
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`w-full py-4 text-sm font-light tracking-wider transition-all duration-300 ${
        isAdded
          ? 'bg-gray-800 hover:bg-gray-800 text-white'
          : 'bg-black hover:bg-gray-800 text-white border-0'
      }`}
    >
      {isAdded ? 'ADDED TO CART' : 'ADD TO CART'}
    </Button>
  )
}