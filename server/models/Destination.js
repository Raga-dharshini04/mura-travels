import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  category: {
    type: String,
    enum: ['beach', 'mountain', 'city', 'forest', 'desert', 'historical'],
    default: 'city'
  },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Destination', destinationSchema);