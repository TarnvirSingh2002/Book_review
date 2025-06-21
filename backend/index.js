import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routers/bookRoutes.js';
import reviewRoutes from './routers/reviewRoutes.js';
import userRoutes from './routers/userRoutes.js';
import cors from 'cors';
import { db } from './db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

db();

app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));