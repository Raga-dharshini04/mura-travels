import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()
await mongoose.connect(process.env.MONGO_URI)

await Admin.deleteMany({})
console.log('All admins deleted!')

await Admin.create({
  email: 'admin456@gmail.com',
  password: 'admin1234'
})
console.log('Fresh admin created!')

mongoose.disconnect()