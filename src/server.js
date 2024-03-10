const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'finkeepdb',
  password: 'tanmay',
  port: 5432,
});

app.post('/api/insertData', async (req, res) => {
  const { data } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO forms (data) VALUES ($1) RETURNING id, data, created_at, updated_at',
      [data]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/insertPatientData', async (req, res) => {
  const { data } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO patientmasterform (data) VALUES ($1) RETURNING id, data, created_at, updated_at',
      [data]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/insertDoctorData', async (req, res) => {
  const { data } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO doctormaster (data) VALUES ($1) RETURNING id, data, created_at, updated_at',
      [data]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/insertOperatorData', async (req, res) => {
  const { data } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO operatormaster (data) VALUES ($1) RETURNING id, data, created_at, updated_at',
      [data]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/insertBillingData', async (req, res) => {
  const { data } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO billingform (data) VALUES ($1) RETURNING id, data, created_at, updated_at',
      [data]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
