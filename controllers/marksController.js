// marksController.js
import { addMarks, getStudentWithMarks } from '../models/marksModel.js';

export const createMarks = async (req, res) => {
  try {
    const newMark = await addMarks(req.body);
    res.status(201).json(newMark.rows[0]);
  } catch (error) {
    console.error('Error adding marks:', error);
    res.status(500).json({ message: 'Failed to add marks' });
  }
};

export const getStudentMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const studentData = await getStudentWithMarks(id);

    if (!studentData) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(studentData);
  } catch (error) {
    console.error('Error fetching student marks:', error);
    res.status(500).json({ message: 'Failed to fetch student marks' });
  }
};
