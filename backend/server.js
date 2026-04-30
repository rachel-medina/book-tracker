const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");

const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "booktracker",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Connection error", err);
  } else {
    console.log("Connected to PostgreSQL");
  }
});

const { createBook } = require("./src/models/bookModel");

let books = []; // temp storage

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

// GET all books
app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ADD a book
app.post("/books", async (req, res) => {
  try {
    const { title, author } = req.body;

    const result = await pool.query(
      "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
      [title, author]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

