const express = require("express");
const cors = require("cors");

const app = express();

let books = []; // temp storage

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

// GET all books
app.get("/books", (req, res) => {
    res.json(books);
});

// ADD a book
app.post("/books", (req, res) => {
    const newBook = req.body;

    books.push(newBook);

    res.json(newBook);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));