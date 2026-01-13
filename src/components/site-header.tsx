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
  if (variant === 'full') {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b ${className}`}
      >
        <div className="w-full max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            store
          </Link>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden md:inline">
                    {user.firstName || user.email}
                  </span>
                  <Button asChild variant="ghost">
                    <Link href="/my-orders">Orders</Link>
                  </Button>
                  {user.role === 'admin' && (
                    <Button asChild variant="ghost">
                      <Link href="/admin-dashboard">Admin</Link>
                    </Button>
                  )}
                </div>
                <CartButton />
                <LogoutButton />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
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
        className="text-2xl font-bold hover:text-primary transition-colors"
      >
        store
      </Link>
      {title && <h2 className="mt-6 text-3xl font-bold text-foreground">{title}</h2>}
      {subtitle && <div className="mt-2 text-lg text-muted-foreground">{subtitle}</div>}
    </div>
  )
}