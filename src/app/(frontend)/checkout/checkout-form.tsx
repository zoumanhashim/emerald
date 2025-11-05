'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface CheckoutFormProps {
  user: any
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ user }) => {
  const { state, clearCart, getTotalPrice } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (state.items.length === 0) {
      setError('Your cart is empty')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items.map((item) => ({
            snack: item.id,
            quantity: item.quantity,
          })),
          totalAmount: getTotalPrice(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      const result = await response.json()
      clearCart()
      router.push(`/my-orders?success=true&orderId=${result.doc.id}`)
    } catch (err) {
      setError('Failed to place order. Please try again.')
      console.error('Order submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <Button asChild className="bg-black hover:bg-gray-800 text-white border-0 text-sm font-light tracking-wider px-8 py-3">
          <Link href="/">CONTINUE SHOPPING</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Order Summary */}
      <div>
        <h3 className="text-2xl font-light text-black mb-6">Order Summary</h3>
        <div className="space-y-6">
          {state.items.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 border border-gray-200">
              {item.image && (
                <div className="relative w-20 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <h4 className="font-light text-black text-lg">{item.name}</h4>
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  {item.category}
                </Badge>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                  <p className="text-lg font-medium text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Total */}
      <div className="flex justify-between items-center text-xl font-light">
        <span className="text-black">Total:</span>
        <span className="text-black">${getTotalPrice().toFixed(2)}</span>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black hover:bg-gray-800 text-white border-0 py-4 text-sm font-light tracking-wider"
        >
          {isSubmitting ? 'PROCESSING...' : 'COMPLETE ORDER'}
        </Button>
      </div>

      <div className="text-sm text-gray-500 text-center space-y-2">
        <p>Order will be placed for: {user.firstName} {user.lastName}</p>
        <p>Email: {user.email}</p>
      </div>
    </form>
  )
}