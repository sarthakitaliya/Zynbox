import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.root';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.get('/health', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/auth", authRouter)

app.listen(3001)