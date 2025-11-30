import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export interface SiteHeaderProps {
  variant?: 'full' | 'simple'
  user?: {
    role?: string
  }
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
          <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
            Those Who Struggle
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {user?.role === 'admin' && (
              <Button asChild variant="ghost">
                <Link href="/admin">Admin Panel</Link>
              </Button>
            )}
            <Button asChild>
              <Link href="/start-campaign">Start a Campaign</Link>
            </Button>
          </div>
        </div>
      </header>
    )
  }

  // Simple variant (for auth pages, etc.)
  return (
    <div className={`text-center ${className}`}>
      <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
        Those Who Struggle
      </Link>
      {title && <h2 className="mt-6 text-3xl font-bold text-foreground">{title}</h2>}
      {subtitle && <div className="mt-2 text-lg text-muted-foreground">{subtitle}</div>}
    </div>
  )
}