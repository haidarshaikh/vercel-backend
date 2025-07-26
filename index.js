import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import marksRoutes from './routes/marksRoutes.js';
import cors from 'cors'

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({
    origin: 'https://vercel-frontend-sepia.vercel.app/'
}));

app.use('/students', studentRoutes);
app.use('/marks', marksRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
