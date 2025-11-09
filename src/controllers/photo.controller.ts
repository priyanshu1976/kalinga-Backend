import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// POST /api/photo/newphoto
// body: { eventName: string, photoUrl: string[] }
// Creates Photo records for an existing Event identified by its title (eventName)
export async function newPhoto(req: Request, res: Response) {
  const { eventName, photoUrl } = req.body
  // accept either eventName or title for compatibility
  const name = eventName

  if (!name || !photoUrl || !Array.isArray(photoUrl) || photoUrl.length === 0) {
    return res.status(400).json({
      error:
        'Missing or invalid fields: eventName/title and photoUrl(array) required',
    })
  }

  try {
    // Find existing event by title

    const exist = await prisma.photo.findFirst({ where: { eventName } })
    if (exist) return res.status(400).json({ error: 'event already present' })
    const data = await prisma.photo.create({
      data: { eventName: name, photoUrl },
    })
    return res.status(201).json({ success: true, created: data })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: (error as Error).message })
  }
}

// POST /api/photo/editphoto
// body: { eventName: string, photoUrl: string | string[] }
// Adds new photo(s) to an existing event identified by title
export async function editPhoto(req: Request, res: Response) {
  const { eventName, photoUrl } = req.body
  const name = eventName

  if (!name || !photoUrl) {
    return res
      .status(400)
      .json({ error: 'Missing eventName/title or photoUrl' })
  }

  const newPhotos = Array.isArray(photoUrl) ? photoUrl : [photoUrl]

  try {
    const existing = await prisma.photo.findFirst({
      where: { eventName: name },
    })
    if (!existing) {
      return res.status(404).json({ error: 'Event not found' })
    }
    const album = [...existing.photoUrl, ...newPhotos]

    const data = await prisma.photo.update({
      where: { id: existing.id },
      data: {
        photoUrl: album,
      },
    })
    return res.status(200).json({ success: true, added: data })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: (error as Error).message })
  }
}

export async function deleteAlbum(req: Request, res: Response) {
  const { id } = req.params
  try {
    const data = await prisma.photo.delete({ where: { id: Number(id) } })
    return res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error: 'error in the controller',
    })
  }
}
export async function getAlbum(req: Request, res: Response) {
  try {
    const data = await prisma.photo.findMany({})
    return res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error: 'error in the controller',
    })
  }
}
