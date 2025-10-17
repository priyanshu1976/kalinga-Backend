import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createEvent(req: Request, res: Response) {
  const { id, type, title, teacherId } = req.body

  // id is optional for autoincrement, so only check required fields
  if (!type || !title || !teacherId) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  console.log(req.body)

  try {
    const event = await prisma.event.create({
      data: {
        type: type.toUpperCase(),
        title,
        teacherId,
      },
    })
    return res.status(201).json({ success: true, event })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: (error as Error).message })
  }
}

export async function deleteEvent(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: 'Missing event id' })
  }

  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: Number(id) },
    })
    return res.status(200).json({ success: true, event: deletedEvent })
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}

export async function getStudentEvent(req: Request, res: Response) {
  const { type } = req.params
  console.log(type)
  if (!type) {
    return res.status(400).json({ error: 'Missing event type' })
  }
  // Validate type is a valid EventType
  const validTypes = ['JUNIOR', 'PRIMARY', 'SENIOR', 'ALL']
  if (!validTypes.includes(type.toUpperCase())) {
    return res.status(400).json({ error: 'Invalid event type' })
  }
  try {
    // Fetch events where type is the requested type or 'ALL'
    const events = await prisma.event.findMany({
      where: {
        OR: [{ type: type.toUpperCase() as any }, { type: 'ALL' }],
      },
    })
    return res.status(200).json({ success: true, events })
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}

export async function getTeacherEvent(req: Request, res: Response) {
  try {
    // Fetch and return all events
    const events = await prisma.event.findMany()
    return res.status(200).json({ success: true, events })
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}
