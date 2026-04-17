import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch books
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // Add book
  const addBook = async (e) => {
    e.preventDefault();

    const newBook = { title, author };

    const res = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    const data = await res.json();
    setBooks([...books, data]);

    setTitle("");
    setAuthor("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Tracker</h1>

      <form onSubmit={addBook}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      <h2>My Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
