import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const { contactName, contactEmail, contactPhone, city, quantity, logo, message } = body

    // Basic validation
    if (!contactName || !contactEmail || !city || !quantity || !logo) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const inquiry = await payload.create({
      collection: 'campaign-inquiries',
      data: {
        contactName,
        contactEmail,
        contactPhone,
        city,
        quantity: Number(quantity),
        logo: logo, // This will be the ID of the uploaded media
        message,
        status: 'new',
      },
    })

    return NextResponse.json({ success: true, inquiryId: inquiry.id }, { status: 201 })
  } catch (error) {
    console.error('Campaign inquiry error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}