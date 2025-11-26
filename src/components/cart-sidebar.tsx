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

  const buttonClass =
    'bg-stone-600 text-white border-2 border-t-stone-500 border-l-stone-500 border-b-stone-800 border-r-stone-800 hover:bg-stone-700 active:border-t-stone-800 active:border-l-stone-800 active:border-b-stone-500 active:border-r-stone-500 rounded-none px-4 py-2 text-sm'

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-stone-800 border-l-4 border-black/50 shadow-2xl z-50 overflow-hidden flex flex-col text-white">
        {/* Header */}
        <div className="p-4 border-b-4 border-black/50 bg-stone-900/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg flex items-center gap-3" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              <ShoppingBag className="h-5 w-5" />
              Cart ({getTotalItems()})
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
              className="h-10 w-10 p-0 hover:bg-stone-700 rounded-none"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div className="space-y-4">
              <p className="text-lg text-stone-300">Your cart is empty.</p>
              <Button
                onClick={closeCart}
                className={buttonClass}
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
                <div key={item.id} className="flex gap-4 bg-black/20 p-2 border-2 border-stone-900">
                  {/* Item Image */}
                  <div className="relative w-16 h-16 rounded-none overflow-hidden flex-shrink-0 bg-black/30 border-2 border-t-stone-600 border-l-stone-600 border-b-stone-900 border-r-stone-900 p-1">
                    {item.image && (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.name}
                        fill
                        className="object-cover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-base leading-tight text-stone-100">
                          {item.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-stone-400 hover:text-white h-6 w-6 p-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-lg font-medium text-yellow-300">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-end">
                      <div className="flex items-center gap-1 bg-stone-900/50 border border-stone-900">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-stone-700 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-base w-8 text-center font-bold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-stone-700 rounded-none"
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
            <div className="border-t-4 border-black/50 p-4 space-y-4 bg-stone-900/50">
              <div className="flex justify-between items-center text-xl">
                <span className="text-stone-300">Total:</span>
                <span className="font-bold text-yellow-300">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full bg-green-600 text-white border-2 border-t-green-500 border-l-green-500 border-b-green-800 border-r-green-800 hover:bg-green-700 active:border-t-green-800 active:border-l-green-800 active:border-b-green-500 active:border-r-green-500 rounded-none py-3 text-base"
                  size="lg"
                >
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-stone-600 text-white border-2 border-t-stone-500 border-l-stone-500 border-b-stone-800 border-r-stone-800 hover:bg-stone-700 active:border-t-stone-800 active:border-l-stone-800 active:border-b-stone-500 active:border-r-stone-500 rounded-none py-3"
                  onClick={closeCart}
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