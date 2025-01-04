import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './router/user.router.js'
import postRouter from './router/post.router.js'
import commentRouter from './router/comment.router.js'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()

const PORT = process.env.PORT || 7000
const app = express()

app.use(express.json()) 
// chuyển đổi kết quả thành dạng json nè 

app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/comment',commentRouter)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT , () => {
    connectDB()
    console.log(`Server run at http://localhost:${PORT}`);
})
