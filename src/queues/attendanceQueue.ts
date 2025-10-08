import { Queue } from 'bullmq'
import { redis } from '../redis'

export const attendanceQueue = new Queue('attendanceQueue', {
  connection: redis,
})
