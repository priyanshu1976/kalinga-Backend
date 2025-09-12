import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function setHomework(req: Request, res: Response) {
  try {
    const { className, section, subject, teacher } = req.body
    if (!className || !section || !subject || !teacher)
      return res.status(400).json({ error: 'Missing fields' })

    const hw = await prisma.homework.create({
      data: { className, section, subject, teacher },
    })
    res.json({ success: true, homework: hw })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}

export async function getHomeworkByTeacher(req: Request, res: Response) {
  try {
    const teacher = req.params.teacher
    const hw = await prisma.homework.findMany({
      where: { teacher },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, homework: hw })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}

export async function getHomeworkForStudents(req: Request, res: Response) {
  try {
    const className = req.params.className.toUpperCase()
    const section = req.params.section
    const hw = await prisma.homework.findMany({
      where: { className, section } as any,
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, homework: hw })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}

export async function deleteHomework(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.homework.delete({ where: { id } })
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
