'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
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
      setError('Your basket is empty')
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
            snack: item.id, // 'snack' is the field name in the Orders collection
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
        <p className="text-muted-foreground mb-6">Your basket is empty</p>
        <Button asChild variant="outline">
          <Link href="/">CONTINUE SHOPPING</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Order Summary */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
        <div className="space-y-6">
          {state.items.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 border border-border rounded-lg">
              {item.image && (
                <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-muted/50">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-lg">{item.name}</h4>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                  <p className="text-lg font-medium text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Total */}
      <div className="flex justify-between items-center text-xl font-semibold">
        <span>Total:</span>
        <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          size="lg"
        >
          {isSubmitting ? 'Placing Order...' : 'Complete Order'}
        </Button>
      </div>

      <div className="text-sm text-muted-foreground text-center space-y-2">
        <p>
          Order will be placed for: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
      </div>
    </form>
  )
}