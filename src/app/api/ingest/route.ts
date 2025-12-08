import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import pinataSDK from '@pinata/sdk'
import fs from 'fs'
import path from 'path'

const pinata = new pinataSDK(process.env.PINATA_API_KEY!, process.env.PINATA_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const formData = await request.formData()
    const stoneId = formData.get('stoneId') as string
    const weight = parseFloat(formData.get('weight') as string)
    const grade = formData.get('grade') as string
    const origin = formData.get('origin') as string
    const imageFile = formData.get('image') as File

    if (!stoneId || !weight || !grade || !imageFile) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Save the uploaded file temporarily
    const tempDir = path.join(process.cwd(), 'temp')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
    }
    const tempFilePath = path.join(tempDir, `${stoneId}_temp.png`)
    const arrayBuffer = await imageFile.arrayBuffer()
    fs.writeFileSync(tempFilePath, Buffer.from(arrayBuffer))

    // Upload image to IPFS
    const readableStreamForFile = fs.createReadStream(tempFilePath)
    const imageUpload = await pinata.pinFileToIPFS(readableStreamForFile)
    const ipfsImageLink = `ipfs://${imageUpload.IpfsHash}`

    // Generate NFT metadata
    const metadata = {
      name: `TES Emerald #${stoneId}`,
      description: `A ${weight}ct Panjshir Emerald. Grade: ${grade}.`,
      image: ipfsImageLink,
      attributes: [
        { trait_type: "Weight", value: weight },
        { trait_type: "Grade", value: grade },
        { trait_type: "Origin", value: origin },
        { trait_type: "Certified", value: "Yes" }
      ]
    }

    // Pin metadata to IPFS
    const metadataUpload = await pinata.pinJSONToIPFS(metadata)

    // Save to Payload CMS
    const emerald = await payload.create({
      collection: 'emeralds',
      data: {
        stoneId,
        weight,
        grade,
        origin,
        image: imageFile, // This will be handled by Payload's media upload
        ipfsHash: metadataUpload.IpfsHash,
        tokenId: null, // Will be set when minted
        minted: false,
      },
    })

    // Clean up temp file
    fs.unlinkSync(tempFilePath)

    return NextResponse.json({
      status: "success",
      ipfsMetadata: metadataUpload.IpfsHash,
      emeraldId: emerald.id
    }, { status: 200 })

  } catch (error) {
    console.error('Ingest error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}