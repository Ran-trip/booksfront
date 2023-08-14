import "./adminDeleteBook.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDeleteBook = () => {
  const [booksList, setBooksList] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/books`
      );
      setBooksList(data);
    }

    fetchBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {booksList.map((book) => (
        <div key={book.id}>
          <h2>{book.name}</h2>
          <p>{new Date(book.releaseDate).toLocaleDateString()}</p>
          <img
            width="200px"
            src={
              book.picture.includes("http")
                ? book.picture
                : `${process.env.REACT_APP_API_URL}/${book.picture}`
            }
            alt={book.name}
          />
          <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          <button onClick={() => navigator("/books")}>Go to Books</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDeleteBook;
