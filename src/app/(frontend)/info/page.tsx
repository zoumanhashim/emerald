import React from 'react'
import Link from 'next/link'
import { Building, Globe, MessageSquare, Gem, Shield, Database } from 'lucide-react'

import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function InfoPage() {
  const faqs = [
    {
      question: 'What makes TES emeralds unique?',
      answer:
        'Each NFT is backed by a physical emerald stone that has been scanned, graded, and certified in our lab. The high-resolution images are permanently stored on IPFS, and the ownership is recorded on the Polygon blockchain.',
    },
    {
      question: 'How is the emerald grading done?',
      answer:
        'Our expert gemologists grade emeralds using industry-standard criteria (AAA, AA, A). Each stone is examined under magnification for color, clarity, cut, and carat weight before being scanned and tokenized.',
    },
    {
      question: 'Where do the emeralds come from?',
      answer:
        'All emeralds are sourced from the renowned Panjshir Valley in Afghanistan, known for producing some of the world\'s finest emeralds. We work directly with trusted suppliers to ensure ethical sourcing.',
    },
    {
      question: 'What is the total supply?',
      answer:
        'The collection is limited to 2,300 NFTs, matching our Year 1 inventory of certified emeralds. This ensures scarcity and value preservation.',
    },
    {
      question: 'How do I redeem my physical emerald?',
      answer:
        'NFT holders can contact us through our admin panel to arrange redemption of their physical stone. We maintain secure storage and can ship worldwide.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" />
      <main className="pt-20">
        <div className="w-full max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">About The Emerald Standard</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Revolutionizing gemstone ownership through blockchain technology and physical backing.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Gem className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle>Physical Backing</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Every NFT represents a real emerald stone held in secure storage.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Shield className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle>Blockchain Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Immutable ownership records on Polygon blockchain with smart contract verification.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Database className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle>IPFS Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p>High-resolution images and metadata stored permanently on decentralized IPFS.</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:support@theemeraldstandard.com"
                  className="text-primary font-semibold hover:underline"
                >
                  support@theemeraldstandard.com
                </a>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Building className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle>Head Office</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lucknow, Uttar Pradesh</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Globe className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle>Global Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Worldwide delivery available</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-16">
            <Button asChild variant="link">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}