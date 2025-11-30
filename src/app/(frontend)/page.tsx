import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import { BarChart, Eye, Target } from 'lucide-react'

import config from '@/payload.config'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" user={user} />

      <main>
        {/* Hero Section */}
        <section className="bg-gray-50 py-20 md:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Connect With Your Audience</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              Place your brand in front of thousands of engaged users. We offer premium advertising
              solutions tailored to your goals.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="#packages">View Our Packages</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="py-16 md:py-24">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why Advertise With Us?</h2>
              <p className="mt-4 text-muted-foreground">
                We provide the platform you need to grow.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 border rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Target className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Targeted Audience</h3>
                <p className="mt-2 text-muted-foreground">
                  Reach a dedicated and engaged user base interested in high-quality content and
                  products.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Eye className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">High Visibility</h3>
                <p className="mt-2 text-muted-foreground">
                  Premium ad placements, including homepage banners and sponsored content, ensure
                  your brand gets noticed.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <BarChart className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Measurable Results</h3>
                <p className="mt-2 text-muted-foreground">
                  Track your campaign's performance with our detailed analytics and transparent
                  reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="bg-gray-50 py-16 md:py-24">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Advertising Packages</h2>
              <p className="mt-4 text-muted-foreground">
                Choose the plan that's right for your budget and goals.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>Perfect for getting started.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Homepage Banner Ad
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Weekly Analytics Report
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Email Support
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="#contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing brands.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Everything in Basic, plus:
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Sponsored Content Feature
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Social Media Shoutout
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Priority Support
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="#contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Custom solutions for scale.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Everything in Pro, plus:
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Custom API Integration
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Dedicated Account Manager
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>Quarterly Strategy Call
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="#contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="w-full max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Grow Your Brand?</h2>
            <p className="mt-4 text-muted-foreground">
              Our team is ready to help you create a custom advertising campaign that delivers
              results. Get in touch today to discuss your goals.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="mailto:sales@example.com?subject=Advertising Inquiry">
                  Contact Sales
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t">
          <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Your Brand Ads. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}