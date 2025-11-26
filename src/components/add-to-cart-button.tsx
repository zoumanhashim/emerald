'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'

import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/lib/cart-context'

interface AddToCartButtonProps {
  product: {
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

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addItem, openCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    })

    setIsAdded(true)

    setTimeout(() => {
      setIsAdded(false)
    }, 1500)

    setTimeout(() => {
      openCart()
    }, 300)
  }

  const addedClass =
    'bg-stone-600 text-stone-300 border-2 border-t-stone-800 border-l-stone-800 border-b-stone-500 border-r-stone-500'
  const defaultClass =
    'bg-green-600 text-white border-2 border-t-green-500 border-l-green-500 border-b-green-800 border-r-green-800 hover:bg-green-700 active:border-t-green-800 active:border-l-green-800 active:border-b-green-500 active:border-r-green-500'

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`w-full py-3 text-base rounded-none transition-all duration-200 ${
        isAdded ? addedClass : defaultClass
      }`}
    >
      {isAdded ? 'Added!' : 'Add to Cart'}
    </Button>
  )
}