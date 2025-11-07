import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CartButton } from '@/components/cart-button'
import { LogoutButton } from '@/components/logout-button'

export interface SiteHeaderProps {
  variant?: 'full' | 'simple'
  user?: any
  title?: string
  subtitle?: string | React.ReactNode
  className?: string
}

export function SiteHeader({
  variant = 'simple',
  user,
  title,
  subtitle,
  className = '',
}: SiteHeaderProps) {
  const buttonClass =
    'bg-stone-600 text-white border-2 border-t-stone-500 border-l-stone-500 border-b-stone-800 border-r-stone-800 hover:bg-stone-700 active:border-t-stone-800 active:border-l-stone-800 active:border-b-stone-500 active:border-r-stone-500 rounded-none px-4 py-2 text-xs'

  if (variant === 'full') {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-stone-800/90 backdrop-blur-sm border-b-4 border-black/50 ${className}`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl hover:text-yellow-300 transition-colors"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            those who <strong className="text-yellow-300">strugle</strong> store
          </Link>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-stone-300 hidden md:inline">
                    {user.firstName || user.email}
                  </span>
                  <Button asChild variant="ghost" className="hover:bg-stone-700 text-stone-300">
                    <Link href="/my-orders">Orders</Link>
                  </Button>
                  {user.role === 'admin' && (
                    <Button asChild variant="ghost" className="hover:bg-stone-700 text-stone-300">
                      <Link href="/admin-dashboard">Admin</Link>
                    </Button>
                  )}
                </div>
                <CartButton />
                <LogoutButton />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" className="hover:bg-stone-700 text-stone-300">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className={buttonClass}>
                  <Link href="/register">List Item</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }

  // Simple variant (for auth pages, etc.)
  return (
    <div className={`text-center ${className}`}>
      <Link
        href="/"
        className="text-2xl hover:text-yellow-300 transition-colors"
        style={{ fontFamily: "'Press Start 2P', cursive" }}
      >
        those who <strong className="text-yellow-300">strugle</strong> store
      </Link>
      {title && <h2 className="mt-6 text-2xl text-stone-100">{title}</h2>}
      {subtitle && <div className="mt-2 text-lg text-stone-300">{subtitle}</div>}
    </div>
  )
}