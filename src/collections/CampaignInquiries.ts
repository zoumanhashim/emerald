import type { CollectionConfig } from 'payload'
import { admins, adminsOnly, anyone } from './access'

export const CampaignInquiries: CollectionConfig = {
  slug: 'campaign-inquiries',
  admin: {
    useAsTitle: 'contactName',
  },
  access: {
    read: admins,
    create: anyone, // Anyone can create an inquiry
    update: admins,
    delete: admins,
    admin: adminsOnly,
  },
  fields: [
    {
      name: 'contactName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'Distribution City',
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
      min: 1,
      label: 'Number of Hoodies',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}