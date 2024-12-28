
import express, { Request, Response } from 'express'
import cors from "cors";
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import useblogRouter from './module/blog/blog.route'
import authRouter from './module/auth/auth.router';
import adminRouter from './module/admin/admin.route';
const app = express()

app.use(express.json())
app.use(cors({ origin: ['http://localhost:5000','https://a3-l2-blog-backend.vercel.app'] }))

app.use('/api/blogs', useblogRouter)
app.use('/api/auth', authRouter)
app.use("/api/admin", adminRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is Live 🔥',
  })
})


app.use(globalErrorHandler)

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found '
  })
})

export default app