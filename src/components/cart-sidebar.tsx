'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'

import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

export const CartSidebar: React.FC = () => {
  const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart()

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-2xl z-50 flex flex-col text-foreground">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-3">
              <ShoppingBag className="h-5 w-5" />
              Cart ({getTotalItems()})
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
              className="h-10 w-10 p-0 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">Your cart is empty.</p>
              <Button
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-card p-2 border rounded-lg">
                  {/* Item Image */}
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted p-1">
                    {item.image && (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-base font-semibold leading-tight">
                          {item.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground h-6 w-6 p-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-end">
                      <div className="flex items-center gap-1 border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-base w-8 text-center font-bold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-4 bg-muted/50">
              <div className="flex justify-between items-center text-xl">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold text-primary">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={closeCart}
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}