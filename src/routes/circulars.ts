import { Router } from 'express'
import * as controller from '../controllers/circularController'

const router = Router()

router.get('/teacher', controller.getAll)
// Create circular
router.post('/', controller.createCircular)
// Get circulars by class for student
router.get('/:className', controller.getCircularsByClass)
// Delete circular by id
router.delete('/:id', controller.deleteCircular)

export default router
