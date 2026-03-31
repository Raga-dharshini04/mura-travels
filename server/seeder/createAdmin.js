import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()
await mongoose.connect(process.env.MONGO_URI)

const existing = await Admin.findOne({ email: 'admin456@gmail.com' })
if (existing) {
  console.log('Admin already exists')
} else {
  await Admin.create({ email: 'admin456@gmail.com', password: 'admin1234' })
  console.log('Admin created successfully!')
}

mongoose.disconnect();