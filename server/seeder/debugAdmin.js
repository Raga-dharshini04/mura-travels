import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'
import bcrypt from 'bcryptjs'

dotenv.config()
await mongoose.connect(process.env.MONGO_URI)

// Check what's in the database
const admins = await Admin.find({})
console.log('Admins in DB:', admins)

// Manually test password match
if (admins.length > 0) {
  const match = await bcrypt.compare('admin123', admins[0].password)
  console.log('Password match result:', match)
}

mongoose.disconnect()