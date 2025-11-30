import React from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <SiteHeader
            title="Contact Information"
            subtitle="We're here to help with any questions you may have."
          />

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p>
                <strong>WhatsApp:</strong> <a href="https://wa.me/918400452650" className="text-primary hover:underline">+91 8400452650</a>
              </p>
              <p>
                <strong>Head Office:</strong> Lucknow, Uttar Pradesh
              </p>
              <p>
                <strong>Operations:</strong> All over India
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button asChild variant="link">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}