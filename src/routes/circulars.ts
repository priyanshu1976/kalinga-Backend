import { Router } from 'express'
import * as controller from '../controllers/circularController'

const router = Router()

// Create circular
router.post('/', controller.createCircular)
// Get circulars by class
router.get('/:className', controller.getCircularsByClass)
// Delete circular by id
router.delete('/:id', controller.deleteCircular)

export default router
