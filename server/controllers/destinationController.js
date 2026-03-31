import Destination from '../models/Destination.js'

export const getDestinations = async (req, res) => {
  try {
    const { category, search } = req.query
    let query = {}
    if (category) query.category = category
    if (search) query.name = { $regex: search, $options: 'i' }
    const destinations = await Destination.find(query)
    res.json(destinations)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
    if (!destination) return res.status(404).json({ message: 'Destination not found' })
    res.json(destination)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body)
    res.status(201).json(destination)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!destination) return res.status(404).json({ message: 'Destination not found' })
    res.json(destination)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id)
    res.json({ message: 'Destination deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}