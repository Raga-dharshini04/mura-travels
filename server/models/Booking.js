import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  tripPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'TripPlan', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  numberOfPeople: { type: Number, required: true, min: 1 },
  message: { type: String, default: '' },
  totalPrice: { type: Number },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)