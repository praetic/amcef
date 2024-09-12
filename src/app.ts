import express from 'express'
import router from './routes'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import errorMiddleware from './middlewares/errorMiddleware'
import authMiddleware from './middlewares/auth'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser())

// #region routes
app.use('/api',authRouter)
app.use('/api',authMiddleware, router)
app.use('/api/users',authMiddleware, userRouter)
// #endregion 

//error middleware
app.use(errorMiddleware)

/* process.on('exit', async () => {
    try {
      await closeDatabase();
    } catch (error) {
      logger.error('Error closing database connection:', error);
    }
  });
  
  // closing db connection when 'SIGINT' (Ctrl+C)
process.on('SIGINT', async () => {
    logger.info('SIGINT received, closing database connection...');
    try {
      await closeDatabase();
      process.exit(0);
    } catch (error) {
      console.error('Error closing database connection:', error);
      process.exit(1);
    }
}); */

export default app;