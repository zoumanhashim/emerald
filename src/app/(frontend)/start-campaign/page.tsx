import React from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CampaignForm } from './campaign-form'

export default function StartCampaignPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <SiteHeader
            title="Start Your Campaign"
            subtitle="Fill out the form below, and our team will contact you shortly to finalize your order and payment."
          />

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>Let&apos;s get started on making a difference together.</CardDescription>
            </CardHeader>
            <CardContent>
              <CampaignForm />
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