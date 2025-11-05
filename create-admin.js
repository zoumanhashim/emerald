import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function createAdmin() {
  const payload = await getPayload({ config })

  try {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
    })
    console.log('Admin user created:', user)
  } catch (error) {
    console.error('Error creating admin:', error)
  }

  process.exit(0)
}

createAdmin()