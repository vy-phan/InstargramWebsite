import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './router/user.router.js'
import postRouter from './router/post.router.js'
import commentRouter from './router/comment.router.js'

dotenv.config()

const PORT = process.env.PORT || 7000
const app = express()

app.use(express.json()) 
// chuyển đổi kết quả thành dạng json nè 

app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/comment',commentRouter)

app.listen(PORT , () => {
    connectDB()
    console.log(`Server run at http://localhost:${PORT}`);
})
