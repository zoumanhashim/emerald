'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('An error occurred during logout', error)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-10 w-10 p-0 hover:bg-gray-50 rounded-full"
      onClick={handleLogout}
    >
      <span className="text-sm font-light text-gray-600">×</span>
    </Button>
  )
}