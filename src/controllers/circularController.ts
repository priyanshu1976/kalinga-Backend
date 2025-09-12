import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createCircular(req: Request, res: Response) {
  try {
    const { url, className } = req.body
    if (!url || !className)
      return res.status(400).json({ error: 'Missing fields' })

    const circular = await prisma.circular.create({
      data: { url, className },
    })
    res.json({ success: true, circular })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}

export async function getCircularsByClass(req: Request, res: Response) {
  try {
    const className = req.params.className.toUpperCase()
    const circulars = await prisma.circular.findMany({
      where: { className } as any,
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, circulars })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}

export async function deleteCircular(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.circular.delete({ where: { id } })
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
