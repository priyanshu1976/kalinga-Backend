import { Router } from 'express'
import * as controller from '../controllers/timetableController'

const router = Router()

router.post('/', controller.setTimetable)
router.get('/:className/:section', controller.getTimetable)
router.delete('/:id', controller.deleteTimetable)

export default router
