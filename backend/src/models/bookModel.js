function createBook(data) {
  return {
    title: data.title,
    author: data.author,
    status: data.status || "Want to Read",
    rating: data.rating || null,
    notes: data.notes || ""
  };
}

module.exports = { createBook };