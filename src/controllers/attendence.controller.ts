import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { attendanceQueue } from '../queues/attendanceQueue'

export async function getStudents(req: Request, res: Response) {
  var { className, section } = req.body

  if (!className || !section) {
    return res.status(400).json({ error: 'Missing class or section' })
  }

  className = className.toString()
  section = section.toUpperCase()

  try {
    const students = await prisma.student.findMany({
      where: {
        class: className,
        section: section,
      },
      select: {
        name: true,
        attendence: true,
      },
    })
    return res.status(200).json({ success: true, students })
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}

export async function studentTotalAtt(req: Request, res: Response) {
  var { name } = req.body
  name = name.toUpperCase()
  if (!name) {
    return res.status(400).json({ error: 'Missing student name' })
  }

  try {
    // Find the student by full name
    const student = await prisma.student.findFirst({
      //@ts-ignore
      where: { name },
      select: {
        name: true,
        attendence: true,
        details: true,
      },
    })

    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    // Get current month and year
    const now = new Date()
    const currentMonth = now.getMonth() + 1 // JS months are 0-based

    // Filter details for this month
    // Assuming details are stored as ISO date strings

    // "details" is a string like "000000000000000000000000000000"
    // Count the number of '1's and get the size
    const detailsString = student.details[currentMonth]
    const presentCount = detailsString
      ? detailsString.split('').filter((c) => c === '1').length
      : 0
    const totalDays = detailsString ? detailsString.length : 0

    return res.status(200).json({
      success: true,
      name: student.name,
      attendence: student.attendence,
      presentCount,
      totalDays,
    })
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}
export async function markAttendance(req: Request, res: Response) {
  const { class: className, section, students } = req.body

  if (!className || !section || !students)
    return res.status(400).json({ error: 'Missing required fields' })

  try {
    await attendanceQueue.add('markAttendance', {
      className,
      section,
      students,
    })

    return res.status(200).json({
      success: true,
      message: 'Attendance queued successfully ✅',
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to queue attendance' })
  }
}
