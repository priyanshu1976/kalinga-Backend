import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function setTimetable(req: Request, res: Response) {
  try {
    const { url, className, section } = req.body
    if (!url || !className || !section)
      return res.status(400).json({ error: 'Missing fields' })

    const tt = await prisma.timetable.create({
      data: { url, className, section },
    })
    res.json({ success: true, timetable: tt })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}

export async function getTimetable(req: Request, res: Response) {
  try {
    const className = req.params.className.toUpperCase()
    const section = req.params.section
    const tts = await prisma.timetable.findMany({
      where: { className, section } as any,
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, timetables: tts })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}

export async function deleteTimetable(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.timetable.delete({ where: { id } })
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
