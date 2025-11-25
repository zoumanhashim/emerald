export const emeraldSeedData = [
  {
    name: 'The Panjshir Star',
    description:
      "A breathtaking cut emerald with exceptional clarity and a deep, vibrant green hue. A true collector's piece.",
    price: 12500.0,
    category: 'cut' as const,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1614613741261-45a423993423?w=600&h=600&fit=crop',
    details: {
      caratWeight: 5.2,
      dimensions: '10.5 x 8.0 x 6.5',
      clarity: 'VVS1',
      color: 'Vivid Green',
      origin: 'Panjshir Valley, Afghanistan',
      certification: 'GIA Certified',
    },
  },
  {
    name: 'Valley Rough',
    description:
      'A high-quality rough emerald crystal showing excellent color saturation and potential for a large cut stone.',
    price: 7800.0,
    category: 'rough' as const,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1617700191397-54e4a3babe77?w=600&h=600&fit=crop',
    details: {
      caratWeight: 15.7,
      dimensions: '25.0 x 18.0 x 12.0',
      clarity: 'Included (Typical for Rough)',
      color: 'Deep Green',
      origin: 'Panjshir Valley, Afghanistan',
      certification: 'None',
    },
  },
  {
    name: 'Emerald Matrix Specimen',
    description:
      'A stunning specimen featuring multiple emerald crystals embedded in their natural calcite and quartz matrix.',
    price: 4200.0,
    category: 'specimen' as const,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1583946367712-24328151235a?w=600&h=600&fit=crop',
    details: {
      caratWeight: 120.0, // Total weight
      dimensions: '60.0 x 45.0 x 30.0',
      clarity: 'N/A (Specimen)',
      color: 'Medium Green',
      origin: 'Panjshir Valley, Afghanistan',
      certification: 'None',
    },
  },
]