import React, { useEffect, useState } from "react";
import { useUser } from '../../context/UserContext'; // Importer le hook du contexte utilisateur
import "./booksList.css";

const BooksList = () => {
  const [selectedBook, setSelectedBook] = useState([]);
  const { genresMap } = useUser(); // Utiliser le genresMap du contexte utilisateur

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("selectedBooks")) || [];
    setSelectedBook(storedBooks);
  }, []);

  const handleDeleteBook = (bookId) => {
    const updatedSelectedBooks = selectedBook.filter((book) => book.id !== bookId);
    setSelectedBook(updatedSelectedBooks);
    //mise à jour du localStorage
    localStorage.setItem("selectedBooks", JSON.stringify(updatedSelectedBooks));
  };

  return (
    <div>
      <h1>Ma liste</h1>
      <ul>
        {selectedBook.map((book) => (
          <li key={book.id}>
            <img
              width="200px"
              src={
                book.picture.includes("http")
                  ? book.picture
                  : `${process.env.REACT_APP_API_URL}/${book.picture}`
              }
              alt={book.name}
            />
            <h3>{book.name}</h3>
            <p>Genre: {genresMap[book.genreId]}</p> {/* Utiliser le genre du contexte utilisateur */}
            <p>{new Date(book.releaseDate).toLocaleDateString()}</p>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
