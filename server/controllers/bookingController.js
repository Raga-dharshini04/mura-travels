import Booking from '../models/Booking.js'
import TripPlan from '../models/TripPlan.js'
import { sendBookingEmailToAdmin, sendConfirmationEmailToCustomer } from '../utils/sendEmail.js'

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('destination', 'name location price')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createBooking = async (req, res) => {
  try {
    const trip = await TripPlan.findById(req.body.tripPlan).populate('destination')
    if (!trip) return res.status(404).json({ message: 'Trip not found' })

    const totalPrice = trip.price * req.body.numberOfPeople

    const booking = await Booking.create({
      ...req.body,
      destination: trip.destination._id,
      totalPrice,
    })

    // Send emails
    await sendBookingEmailToAdmin({ ...req.body, totalPrice }, trip.title)
    await sendConfirmationEmailToCustomer({ ...req.body, totalPrice }, trip.title)

    res.status(201).json(booking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: 'Booking cancelled' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}