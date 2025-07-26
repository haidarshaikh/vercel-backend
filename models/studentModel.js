import pool from '../db.js';

export const createStudent = ({ first_name, last_name, mobile, email, classroom }) =>
  pool.query(
    `INSERT INTO students (first_name, last_name, mobile, email, classroom)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [first_name, last_name, mobile, email, classroom]
  );

export const getStudents = (limit, offset) =>
  pool.query(`SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2`, [limit, offset]);

export const getStudentById = (id) =>
  pool.query(`SELECT * FROM students WHERE id = $1`, [id]);

export const updateStudent = ({ id, first_name, last_name, mobile, email, classroom }) =>
  pool.query(
    `UPDATE students
     SET first_name = $1, last_name = $2, mobile = $3, email = $4, classroom = $5
     WHERE id = $6 RETURNING *`,
    [first_name, last_name, mobile, email, classroom, id]
  );

export const deleteStudent = (id) =>
  pool.query(`DELETE FROM students WHERE id = $1 RETURNING *`, [id]);
