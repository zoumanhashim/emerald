import type { CollectionConfig } from 'payload'
import { admins, adminsOnly, anyone } from './access'

export const Emeralds: CollectionConfig = {
  slug: 'emeralds',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
    admin: adminsOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false, // Make optional for seeding
    },
    {
      name: 'imageUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'For seeding purposes. Use the Image upload field for actual products.',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Rough Emerald', value: 'rough' },
        { label: 'Cut Emerald', value: 'cut' },
        { label: 'Specimen', value: 'specimen' },
      ],
      required: true,
    },
    {
      name: 'details',
      type: 'group',
      fields: [
        {
          name: 'caratWeight',
          type: 'number',
          label: 'Carat Weight',
          required: true,
        },
        {
          name: 'dimensions',
          type: 'text',
          label: 'Dimensions (mm)',
          required: true,
        },
        {
          name: 'clarity',
          type: 'text',
          required: true,
        },
        {
          name: 'color',
          type: 'text',
          required: true,
        },
        {
          name: 'origin',
          type: 'text',
          defaultValue: 'Panjshir Valley, Afghanistan',
          required: true,
        },
        {
          name: 'certification',
          type: 'text',
          label: 'Certification (e.g., GIA)',
        },
      ],
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}