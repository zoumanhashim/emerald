import { Payload, PayloadRequest } from 'payload'
import { emeraldSeedData } from './emeralds'

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  try {
    const emeraldPromises = emeraldSeedData.map(async (emerald) => {
      return await payload.create({
        collection: 'emeralds',
        data: {
          name: emerald.name,
          description: emerald.description,
          price: emerald.price,
          category: emerald.category,
          available: emerald.available,
          imageUrl: emerald.imageUrl,
          details: emerald.details,
        },
        req,
      })
    })

    const createdEmeralds = await Promise.all(emeraldPromises)

    payload.logger.info(
      `Successfully created ${createdEmeralds.length} emeralds with placeholder images`,
    )
  } catch (error) {
    payload.logger.error('Error running seed migration:', error)
    throw error
  }
}