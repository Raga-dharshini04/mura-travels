import TripPlan from '../models/TripPlan.js'

export const getTrips = async (req, res) => {
  try {
    const trips = await TripPlan.find().populate('destination', 'name location country')
    res.json(trips)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getTripById = async (req, res) => {
  try {
    const trip = await TripPlan.findById(req.params.id).populate('destination')
    if (!trip) return res.status(404).json({ message: 'Trip not found' })
    res.json(trip)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createTrip = async (req, res) => {
  try {
    const trip = await TripPlan.create(req.body)
    res.status(201).json(trip)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const updateTrip = async (req, res) => {
  try {
    const trip = await TripPlan.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!trip) return res.status(404).json({ message: 'Trip not found' })
    res.json(trip)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteTrip = async (req, res) => {
  try {
    await TripPlan.findByIdAndDelete(req.params.id)
    res.json({ message: 'Trip deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}