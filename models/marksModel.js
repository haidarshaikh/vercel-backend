// marksModel.js
import pool from '../db.js';

export const addMarks = ({ student_id, subject, marks, out_of_marks }) =>
  pool.query(
    `INSERT INTO marks (student_id, subject, marks, out_of_marks)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [student_id, subject, marks, out_of_marks]
  );

export const getMarksByStudentId = (student_id) =>
  pool.query(`SELECT * FROM marks WHERE student_id = $1`, [student_id]);

export const getStudentWithMarks = async (student_id) => {
  const studentResult = await pool.query(
    `SELECT id, first_name, last_name, email, mobile, classroom
     FROM students WHERE id = $1`,
    [student_id]
  );

  if (studentResult.rows.length === 0) return null;

  const marksResult = await pool.query(
    `SELECT id, subject, marks, out_of_marks
     FROM marks WHERE student_id = $1`,
    [student_id]
  );

  return {
    ...studentResult.rows[0],
    Marks: marksResult.rows,
  };
};
