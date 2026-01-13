import { Payload, PayloadRequest } from 'payload'
import { productSeedData } from './products'

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  try {
    // Create products with placeholder image URLs
    const productPromises = productSeedData.map(async (product) => {
      return await payload.create({
        collection: 'products',
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          available: product.available,
          imageUrl: product.imageUrl,
        },
        req,
      })
    })

    const createdProducts = await Promise.all(productPromises)

    payload.logger.info(
      `Successfully created ${createdProducts.length} products with placeholder images`,
    )
  } catch (error) {
    payload.logger.error('Error running seed migration:', error)
    throw error
  }
}