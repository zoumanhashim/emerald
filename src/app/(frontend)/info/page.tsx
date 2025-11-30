import React from 'react'
import Link from 'next/link'
import { Building, Globe, MessageSquare } from 'lucide-react'

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
      question: 'What is the minimum order quantity?',
      answer:
        'The minimum order to start a campaign is 50 hoodies. This ensures we can make a meaningful impact in the chosen distribution area.',
    },
    {
      question: 'Can I choose a specific area within a city for distribution?',
      answer:
        'While you choose the primary city, our on-ground teams select the specific areas with the most need to ensure the donations have the greatest impact. We focus on shelters, railway stations, and areas with high concentrations of homeless individuals.',
    },
    {
      question: 'What kind of media will I receive?',
      answer:
        'You will receive a collection of high-resolution photos and short video clips from the distribution event. This media is perfect for sharing on your social channels, website, and internal communications to showcase your brand\'s social responsibility.',
    },
    {
      question: 'How long does the entire process take?',
      answer:
        'From finalizing your order to distribution, the process typically takes 2-3 weeks. This includes hoodie production, logo printing, logistics, and coordinating the distribution event.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="full" />
      <main className="pt-20">
        <div className="w-full max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re here to help with any questions you may have.
            </p>
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
                <CardTitle>WhatsApp Us</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="https://wa.me/918400452650"
                  className="text-primary font-semibold hover:underline"
                >
                  +91 8400452650
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
                <CardTitle>Our Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Operations All Over India</p>
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