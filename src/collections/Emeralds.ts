import type { CollectionConfig } from 'payload'
import { admins, adminsOnly, anyone } from './access'

export const Emeralds: CollectionConfig = {
  slug: 'emeralds',
  admin: {
    useAsTitle: 'stoneId',
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
      name: 'stoneId',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'weight',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'grade',
      type: 'select',
      options: [
        { label: 'AAA', value: 'AAA' },
        { label: 'AA', value: 'AA' },
        { label: 'A', value: 'A' },
      ],
      required: true,
    },
    {
      name: 'origin',
      type: 'text',
      required: true,
      defaultValue: 'Panjshir Valley',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ipfsHash',
      type: 'text',
    },
    {
      name: 'tokenId',
      type: 'number',
    },
    {
      name: 'minted',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}