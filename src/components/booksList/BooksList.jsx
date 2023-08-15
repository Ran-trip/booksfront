import React, { useEffect } from "react";
import { useBooks } from "../../context/BooksContext"; // Importer le contexte des livres
import { useUser } from "../../context/UserContext"; // Importer le contexte utilisateur
import "./booksList.css";

const BooksList = () => {
  const { genresMap } = useUser(); // Utiliser le genresMap du contexte utilisateur
  const { booksList, setBooksList } = useBooks(); // Utiliser le contexte des livres

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("selectedBooks")) || [];
    setBooksList(storedBooks);
  }, [setBooksList]);

  const handleDeleteBook = (bookId) => {
    const updatedSelectedBooks = booksList.filter((book) => book.id !== bookId);
    setBooksList(updatedSelectedBooks);

    // Mise à jour du localStorage avec les livres mis à jour
    localStorage.setItem("selectedBooks", JSON.stringify(updatedSelectedBooks));
    // Mettre à jour le genre associé dans le localStorage
    const updatedGenresMap = { ...genresMap };
    delete updatedGenresMap[bookId];
    localStorage.setItem("genresMap", JSON.stringify(updatedGenresMap));
  };

  return (
    <div>
      <h1>Ma liste</h1>
      <ul>
        {booksList.map((book) => (
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
            <p>Genre: {genresMap[book.genreId]}</p>
            <p>{new Date(book.releaseDate).toLocaleDateString()}</p>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
