import express from 'express'
import cors from 'cors'
import circularRoutes from './routes/circulars'
import timetableRoutes from './routes/timetable'
import homeworkRoutes from './routes/homework'
import dotenv from 'dotenv'
dotenv.config()
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())
// Helmet helps secure Express apps by setting various HTTP headers to protect against common vulnerabilities.
app.use(helmet())
// Morgan is an HTTP request logger middleware for Node.js, used here in 'dev' mode for concise colored output.
app.use(morgan('dev'))

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
