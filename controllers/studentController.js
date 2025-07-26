import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../models/studentModel.js';

import { getMarksByStudentId } from '../models/marksModel.js';

export const create = async (req, res) => {
  try {
    const { first_name, last_name, mobile, email, classroom } = req.body;
    const result = await createStudent({ first_name, last_name, mobile, email, classroom });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Check if the error is unique violation for email
    if (err.code === '23505' && err.constraint === 'students_email_key') {
      return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
    }
    // Other errors
    res.status(500).json({ error: err.message });
  }
};


export const list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const students = await getStudents(limit, offset);
    res.status(200).json(students.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await getStudentById(id);
    if (student.rows.length === 0) return res.status(404).json({ error: 'Student not found' });

    const marks = await getMarksByStudentId(id);
    res.status(200).json({ ...student.rows[0], marks: marks.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, mobile, email, classroom } = req.body;

  try {
    const result = await updateStudent({ id, first_name, last_name, mobile, email, classroom });
    if (result.rows.length === 0) return res.status(404).json({ error: 'Student not found' });

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteStudent(id);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Student not found' });

    res.status(200).json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
