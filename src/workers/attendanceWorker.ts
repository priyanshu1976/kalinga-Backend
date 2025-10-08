import { Worker } from 'bullmq'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { redis } from '../redis'

const worker = new Worker(
  'attendanceQueue',
  async (job) => {
    const { className, section, students } = job.data

    const now = new Date()
    const monthIndex = now.getMonth()
    const dayIndex = now.getDate() - 1

    for (const studentData of students) {
      const { id, present } = studentData

      const student = await prisma.student.findUnique({ where: { id } })
      if (!student) continue

      const details = [...student.details]
      if (details.length < 12) {
        const defaultMonths = [
          '0000000000000000000000000000000', // Jan
          '0000000000000000000000000000', // Feb
          '0000000000000000000000000000000', // Mar
          '000000000000000000000000000000', // Apr
          '0000000000000000000000000000000', // May
          '000000000000000000000000000000', // Jun
          '0000000000000000000000000000000', // Jul
          '0000000000000000000000000000000', // Aug
          '000000000000000000000000000000', // Sep
          '0000000000000000000000000000000', // Oct
          '000000000000000000000000000000', // Nov
          '0000000000000000000000000000000', // Dec
        ]
        for (let i = details.length; i < 12; i++) details[i] = defaultMonths[i]
      }

      if (present) {
        let monthString = details[monthIndex]
        const chars = monthString.split('')
        if (chars[dayIndex] === '0') {
          chars[dayIndex] = '1'
          monthString = chars.join('')

          await prisma.student.update({
            where: { id },
            data: {
              attendence: student.attendence + 1,
              details: {
                set: details.map((m, i) =>
                  i === monthIndex ? monthString : m
                ),
              },
            },
          })
        }
      }
    }

    return { status: 'done' }
  },
  { connection: redis }
)

worker.on('completed', (job) => {
  console.log(`✅ Attendance job ${job.id} completed`)
})

worker.on('failed', (job, err) => {
  console.error(`❌ Attendance job ${job?.id} failed:`, err)
})
