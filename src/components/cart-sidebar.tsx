'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'

import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export const CartSidebar: React.FC = () => {
  const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart()

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 shadow-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-light text-black flex items-center gap-3">
              <ShoppingBag className="h-5 w-5" />
              CART ({getTotalItems()})
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeCart}
              className="h-10 w-10 p-0 hover:bg-gray-50 rounded-full"
            >
              <X className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-light text-gray-800">Your cart is empty</p>
                <p className="text-gray-600 text-sm">Add some items to get started</p>
              </div>
              <Button
                onClick={closeCart}
                className="bg-black hover:bg-gray-800 text-white border-0 text-sm font-light tracking-wider px-6 py-3"
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Item Image */}
                  {item.image && (
                    <div className="relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-light text-black text-sm leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-black h-6 w-6 p-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-black">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-light text-black">Total:</span>
                <span className="text-lg font-medium text-black">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-black hover:bg-gray-800 text-white border-0 py-4 text-sm font-light tracking-wider"
                  size="lg"
                >
                  <Link href="/checkout" onClick={closeCart}>
                    CHECKOUT
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-4 text-sm font-light tracking-wider"
                  onClick={closeCart}
                >
                  CONTINUE SHOPPING
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}