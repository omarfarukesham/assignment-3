
import express, { Request, Response } from 'express'
import userRouter from './module/user/user.router'
import authRouter from './module/auth/auth.router'
import blogRouter from './module/blog/blog.router'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import adminRouter from './module/admin/admin.router'
import notFound from './middlewares/notFound'


const app = express()

// middleware
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/blogs', blogRouter)


app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is now Live - chill',
  })
})


app.use(globalErrorHandler)
app.use(notFound)



export default app
