
import express, { Request, Response } from 'express'
import userRouter from './module/user/user.router'
import authRouter from './module/auth/auth.router'
import blogRouter from './module/blog/blog.router'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import adminRouter from './module/admin/admin.router'
import notFound from './middlewares/notFound'
import { ProductRoutes } from './module/product/product.routes'
import { OrderRoutes } from './module/order/order.routes'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express()
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));


// middleware
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/products', ProductRoutes)
app.use('/api/order', OrderRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is now Live - Alhamdulillah',
  })
})


app.use(globalErrorHandler)
app.use(notFound)



export default app
