import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get current user
    const authResult = await payload.auth(request)
    if (!authResult.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // In a real implementation, you'd track NFT ownership on-chain
    // For now, we'll return all minted emeralds as an example
    const emeralds = await payload.find({
      collection: 'emeralds',
      where: {
        minted: {
          equals: true,
        },
      },
      limit: 100,
      sort: '-createdAt',
    })

    return NextResponse.json({
      nfts: emeralds.docs.map(emerald => ({
        id: emerald.id,
        stoneId: emerald.stoneId,
        weight: emerald.weight,
        grade: emerald.grade,
        origin: emerald.origin,
        image: emerald.image,
        tokenId: emerald.tokenId,
        ipfsHash: emerald.ipfsHash,
        mintedAt: emerald.updatedAt,
      })),
      total: emeralds.totalDocs,
    })
  } catch (error) {
    console.error('User NFTs error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}