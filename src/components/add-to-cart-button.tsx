'use client'

import React, { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

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

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ snack: emerald }) => {
  const { addItem, openCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: emerald.id,
      name: emerald.name,
      price: emerald.price,
      category: emerald.category,
      image: emerald.image,
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
      className="w-full py-3 text-base transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-secondary/90"
      size="lg"
    >
      {isAdded ? 'Added to Basket' : 'Add to Basket'}
    </Button>
  )
}