import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import musicRoutes from './routes/musicRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/music', musicRoutes);
app.use('/api/auth', authRoutes);

export default app;
