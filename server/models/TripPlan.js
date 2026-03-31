import mongoose from 'mongoose'

const tripPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true },
  image: { type: String, default: '' },
  included: [String],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
}, { timestamps: true })

export default mongoose.model('TripPlan', tripPlanSchema);