import express from 'express'
import authRouter from './routes/auth'
import listsRouter from './routes/lists'
import itemsRouter from './routes/items'
import errorMiddleware from './middlewares/error'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(cookieParser())

// #region routes
app.use('/api/auth', authRouter)
app.use('/api/lists', listsRouter)
app.use('/api/items', itemsRouter)
// #endregion

//error middleware
app.use(errorMiddleware)

export default app
