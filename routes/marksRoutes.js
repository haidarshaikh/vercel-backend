import express from 'express';
import { createMarks, getStudentMarks } from '../controllers/marksController.js';

const router = express.Router();

router.post('/', createMarks);
router.get('/:id', getStudentMarks);

export default router;
