import express from 'express';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
