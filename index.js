// index.js
import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import marksRoutes from './routes/marksRoutes.js';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // change this to your frontend domain when deployed
}));

app.use('/students', studentRoutes);
app.use('/marks', marksRoutes);

// Export the app wrapped in serverless handler
export const handler = serverless(app);
