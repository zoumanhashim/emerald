'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Upload } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']

const formSchema = z.object({
  contactName: z.string().min(2, 'Name is too short'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  logo: z
    .any()
    .refine((files) => files?.length == 1, 'Logo image is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png, .svg and .webp files are accepted.',
    ),
  message: z.string().optional(),
})

export function CampaignForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [fileName, setFileName] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      city: '',
      quantity: 50, // A sensible default
      message: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setError('')

    try {
      // Step 1: Upload the logo
      const logoFile = values.logo[0]
      const formData = new FormData()
      formData.append('file', logoFile)
      formData.append('alt', `${values.contactName} Logo`)

      const uploadResponse = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload logo.')
      }

      const uploadedMedia = await uploadResponse.json()
      const logoId = uploadedMedia.doc.id

      // Step 2: Submit the campaign inquiry with the logo ID
      const inquiryData = {
        ...values,
        logo: logoId,
      }

      const inquiryResponse = await fetch('/api/campaign-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData),
      })

      if (!inquiryResponse.ok) {
        throw new Error('Failed to submit campaign inquiry.')
      }

      setSuccess(true)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <Alert>
        <AlertDescription className="text-center">
          <h3 className="font-bold text-lg mb-2">Thank You!</h3>
          <p>
            Your campaign inquiry has been submitted successfully. Our team will review your
            details and get in touch with you shortly to finalize the order and payment.
          </p>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Hoodies</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distribution City</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mumbai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Brand Logo</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="file"
                    className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    onChange={(e) => {
                      field.onChange(e.target.files)
                      setFileName(e.target.files?.[0]?.name || '')
                    }}
                  />
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {fileName || 'Click or drag to upload your logo'}
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, SVG, WEBP up to 5MB</p>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <hr />

        <h3 className="text-lg font-semibold">Contact Information</h3>

        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 12345 67890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Message (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any specific instructions or questions?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </Button>
      </form>
    </Form>
  )
}