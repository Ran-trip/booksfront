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
      const adminJwt = localStorage.getItem("adminJwt");
      await axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`,
      {
        headers: {
          Authorization: `Bearer ${adminJwt}`, // Utilisez le token d'authentification de l'admin
        },
      } 
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerDelete">
      {booksList.map((book) => (
        <div key={book.id} className="cardDelete">
          <h2 className="booksNameDelete">{book.name}</h2>
          <p className="dateStyleDelete">{new Date(book.releaseDate).toLocaleDateString()}</p>
          <img
            className="imageDelete"
            width="200px"
            src={
              book.picture.includes("http")
                ? book.picture
                : `${process.env.REACT_APP_API_URL}/${book.picture}`
            }
            alt={book.name}
          />
          <button className="buttonDeleteBook" onClick={() => handleDeleteBook(book.id)}>Delete</button>
          <button className="buttonGoHome" onClick={() => navigator("/books")}>Go to Books</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDeleteBook;
