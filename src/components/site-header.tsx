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
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 ${className}`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-light tracking-tight text-black hover:text-gray-600 transition-colors">
            SCHIZO
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-light text-gray-600 hover:text-black transition-colors tracking-wider">
              COLLECTION
            </Link>
            <Link href="#" className="text-sm font-light text-gray-600 hover:text-black transition-colors tracking-wider">
              ABOUT
            </Link>
            <Link href="#" className="text-sm font-light text-gray-600 hover:text-black transition-colors tracking-wider">
              CONTACT
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-4">
                  <span className="text-sm text-gray-600 font-light">
                    {user.firstName || user.email}
                  </span>
                  <Button asChild variant="ghost" size="sm" className="text-sm font-light hover:bg-gray-50">
                    <Link href="/my-orders">ORDERS</Link>
                  </Button>
                  {user.role === 'admin' && (
                    <Button asChild variant="ghost" size="sm" className="text-sm font-light hover:bg-gray-50">
                      <Link href="/admin-dashboard">ADMIN</Link>
                    </Button>
                  )}
                </div>
                <CartButton />
                <LogoutButton />
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm" className="text-sm font-light hover:bg-gray-50 tracking-wider">
                  <Link href="/login">SIGN IN</Link>
                </Button>
                <Button asChild size="sm" className="bg-black hover:bg-gray-800 text-white border-0 text-sm font-light tracking-wider">
                  <Link href="/register">SIGN UP</Link>
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
      <Link href="/" className="text-3xl font-light text-black tracking-tight">
        SCHIZO
      </Link>
      {title && <h2 className="mt-6 text-3xl font-light text-gray-900">{title}</h2>}
      {subtitle && <div className="mt-2 text-sm text-gray-600">{subtitle}</div>}
    </div>
  )
}