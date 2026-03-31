import Review from '../models/Review.js'
import Destination from '../models/Destination.js'

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ destination: req.params.destinationId })
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body)

    // Recalculate avg rating on the destination
    const reviews = await Review.find({ destination: req.body.destination })
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    await Destination.findByIdAndUpdate(req.body.destination, {
      rating: avg.toFixed(1),
      reviewCount: reviews.length
    })

    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}