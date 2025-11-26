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

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdded}
      className="w-full transition-all duration-200"
      size="lg"
    >
      {isAdded ? 'Added!' : 'Add to Cart'}
    </Button>
  )
}