import express from 'express';
import authRouter from './routes/authRoutes'; // Подразумевается, что authRouter экспортирует router из authRoutes
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Используйте роутеры и middleware
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
