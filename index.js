const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json());
// Routes

// create a number
app.post('/numbers', async (req, res) => {
  try {
    const { description } = req.body;
    const newNumber = await pool.query('INSERT INTO list (description) VALUES($1) RETURNING *', [
      description,
    ]);
    res.json(newNumber.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// get all numbers
app.get('/numbers', async (req, res) => {
  try {
    const allNumbers = await pool.query('SELECT * FROM list');
    res.json(allNumbers.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get a number
app.get('/numbers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const number = await pool.query('SELECT * FROM list WHERE list_id = $1', [id]);
    res.json(number.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
