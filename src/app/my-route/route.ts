import configPromise from '@payload-config'

export const GET = async (_request: Request) => {
  await getPayload({
    config: configPromise,
  })

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}