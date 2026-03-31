import express from 'express'
import { getTrips, getTripById, createTrip, updateTrip, deleteTrip } from '../controllers/tripController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getTrips)
router.get('/:id', getTripById)
router.post('/', protect, createTrip)
router.put('/:id', protect, updateTrip)
router.delete('/:id', protect, deleteTrip)

export default router;