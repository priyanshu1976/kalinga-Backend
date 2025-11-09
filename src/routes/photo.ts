import express from 'express'
import {
  newPhoto,
  editPhoto,
  getAlbum,
  deleteAlbum,
} from '../controllers/photo.controller'
import { get } from 'axios'
import e from 'express'

const router = express.Router()

router.post('/newphoto', newPhoto)
router.post('/editphoto', editPhoto)
router.get('/', getAlbum)
router.delete('/:id', deleteAlbum)

export default router
