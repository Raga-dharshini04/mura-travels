import express from 'express'
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} from '../controllers/destinationController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getDestinations)
router.get('/:id', getDestinationById)
router.post('/', protect, createDestination)
router.put('/:id',protect, updateDestination)
router.delete('/:id',protect, deleteDestination)

export default router;