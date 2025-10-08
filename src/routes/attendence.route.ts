import { Router } from 'express'
import {
  getStudents,
  markAttendance,
  studentTotalAtt,
} from '../controllers/attendence.controller'

const router = Router()

// * teacher
router.post('/getAll', getStudents)
router.post('/byname', studentTotalAtt)
router.post('/markAttendence', markAttendance)
// * student

export default router
