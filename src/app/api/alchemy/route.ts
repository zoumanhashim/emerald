import { NextRequest, NextResponse } from 'next/server'

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export async function GET(request: NextRequest) {
  try {
    if (!ALCHEMY_API_KEY || !CONTRACT_ADDRESS) {
      return NextResponse.json({ message: 'API configuration missing' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')

    if (!owner) {
      return NextResponse.json({ message: 'Owner address required' }, { status: 400 })
    }

    // Fetch NFTs owned by this address
    const response = await fetch(
      `https://polygon-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${owner}&contractAddresses[]=${CONTRACT_ADDRESS}&withMetadata=true`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch NFT data')
    }

    const data = await response.json()

    return NextResponse.json({
      ownedNFTs: data.ownedNfts || [],
      totalCount: data.totalCount || 0,
    })
  } catch (error) {
    console.error('Alchemy API error:', error)
    return NextResponse.json({ message: 'Failed to fetch NFT data' }, { status: 500 })
  }
}