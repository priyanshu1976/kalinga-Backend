import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function setHomework(req: Request, res: Response) {
  try {
    const { className, section, teacherId, pdf_url, title } = req.body
    if (!className || !section || !teacherId)
      return res.status(400).json({ error: 'Missing fields' })

    const hw = await prisma.homework.create({
      data: {
        className,
        section: section.toUpperCase(),
        teacherId,
        pdf_url,
        title,
      },
    })
    res.json({ success: true, homework: hw })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}

export async function getHomeworkByTeacher(req: Request, res: Response) {
  try {
    const teacherId = req.params.teacherId
    const hw = await prisma.homework.findMany({
      where: { teacherId },
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
    const section = req.params.section.toUpperCase()
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
