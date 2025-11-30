import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import { BarChart, Heart, Users } from 'lucide-react'

import config from '@/payload.config'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'

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
            <h1 className="text-4xl md:text-6xl font-bold">Sponsor Warm Hoodies</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              This winter, many people in our city will sleep outside without proper warm clothing.
              Join us to give high-quality hoodies directly to people living on the streets.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="#contact">Become a Sponsor</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="mt-4 text-muted-foreground">
                A simple, transparent process to make a direct impact.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 border rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Heart className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">1. You Sponsor</h3>
                <p className="mt-2 text-muted-foreground">
                  Your contribution covers the full cost of each hoodie, from fabric to
                  distribution.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Users className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">2. We Distribute</h3>
                <p className="mt-2 text-muted-foreground">
                  We give high-quality hoodies with your brand logo directly to people in need.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <BarChart className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">3. You See The Impact</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive photo updates and a simple report showing your contribution at work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsorship Benefits Section */}
        <section id="why-sponsor" className="bg-gray-50 py-16 md:py-24">
          <div className="w-full max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold">Why Sponsor?</h2>
              <p className="mt-4 text-muted-foreground">
                In return for your support, your brand gets meaningful visibility while making a
                real difference in the community.
              </p>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span>
                    <strong>Brand Feature:</strong> Your logo printed as "Supported by [Your
                    Brand]" on every sponsored hoodie.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span>
                    <strong>Social Proof:</strong> Get tagged in photo/video updates from our
                    distributions for your customers and team to see.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span>
                    <strong>Transparent Reporting:</strong> Receive a simple report with cost
                    breakdowns and impact metrics.
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610653289462-3554c537b33c?q=80&w=2070&auto=format&fit=crop"
                alt="Person wearing a hoodie"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="w-full max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Make a Difference?</h2>
            <p className="mt-4 text-muted-foreground">
              Let's keep our community warm this winter. For around ₹500 per hoodie, you can
              sponsor 100 hoodies and warm 100 people. Schedule a 10-minute call to discuss the
              numbers and design options.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="mailto:your-email@example.com?subject=Sponsorship Inquiry">
                  Schedule a Call
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t">
          <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Hoodies for Warmth. A community project.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}