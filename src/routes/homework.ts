import { Router } from 'express'
import * as controller from '../controllers/homeworkController'

const router = Router()

router.post('/', controller.setHomework)
router.get('/teacher/:teacherId', controller.getHomeworkByTeacher)
router.get('/student/:className/:section', controller.getHomeworkForStudents)
router.delete('/:id', controller.deleteHomework)

export default router
