import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import destinationRoutes from './routes/destinations.js'
import bookingRoutes from './routes/bookings.js'
import reviewRoutes from './routes/reviews.js'
import tripRoutes from './routes/trips.js'
import authRoutes from './routes/auth.js'

dotenv.config()
console.log('Email user:', process.env.ADMIN_EMAIL)
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/destinations', destinationRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => res.send('Tourism API running'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))