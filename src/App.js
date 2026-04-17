import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    status: "Want to Read",
    notes: ""
  });

  

  // GET books
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // handle input change
  const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedForm = {
    ...form,
    [name]: value
  };

  if (name === "status" && value !== "Completed") {
    updatedForm.rating = "";
  }

  setForm(updatedForm);
};

  // add book
  const addBook = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const newBook = await res.json();
    setBooks([...books, newBook]);

    // reset form
    setForm({
      title: "",
      author: "",
      status: "Want to Read",
      rating: "",
      notes: ""
    });

    
  };

  return (
    <div className="container">
      <h1>📚 Book Tracker</h1>

      {/* FORM */}
      <form onSubmit={addBook} className="form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />

        {/* STATUS DROPDOWN */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Want to Read</option>
          <option>Reading</option>
          <option>Completed</option>
        </select>

        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          disabled={form.status !== "Completed"}
        >
          <option value="" disabled>
            No Rating Yet
          </option>
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐⭐</option>
          <option value="3">3 ⭐⭐⭐</option>
          <option value="4">4 ⭐⭐⭐⭐</option>
          <option value="5">5 ⭐⭐⭐⭐⭐</option>
        </select>

        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">Add Book</button>
      </form>

      {/* LIST */}
      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p className="status">{book.status}</p>
            <p>⭐ {book.rating}</p>
            <p>{book.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;