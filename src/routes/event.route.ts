import { Router } from 'express'
import { createEvent } from '../controllers/event.controller'
import {
  deleteEvent,
  getTeacherEvent,
  getStudentEvent,
} from '../controllers/event.controller'

const router = Router()
// * teacher
router.put('/create', createEvent)
router.delete('/delete/:id', deleteEvent)
router.get('/tevent', getTeacherEvent)
// * student
router.get('/:type', getStudentEvent)

export default router
