// server/index.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Replace these values with your actual database credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task_tracker',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Tracker API');
});

// Routes
app.get('/tasks', (req, res) => {
  // Fetch tasks from the database and send them as a response
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  // Extract task data from the request body
  const { title, description } = req.body;

  // Insert the new task into the database
  const query = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, false)';
  db.query(query, [title, description], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Task added successfully');
  });
});

app.delete('/tasks/:taskId', (req, res) => {
  // Extract task ID from the URL parameters
  const taskId = req.params.taskId;

  // Delete the task from the database
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [taskId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('Task deleted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
