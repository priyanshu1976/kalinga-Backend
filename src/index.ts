import express from 'express'
import cors from 'cors'
import circularRoutes from './routes/circulars'
import timetableRoutes from './routes/timetable'
import homeworkRoutes from './routes/homework'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/circular', circularRoutes)
app.use('/api/timetable', timetableRoutes)
app.use('/api/homework', homeworkRoutes)

app.get('/', (req, res) =>
  res.json({ ok: true, message: 'School backend running' })
)

app.listen(3001, () => {
  console.log('app running at http://localhost:3001')
})
export default app
