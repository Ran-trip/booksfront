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
    <div className="containerBookList">
      <h1 className="titleBookList">Ma liste</h1>
      <div className="bookGrid">
        {booksList.map((book, index) => (
          <div className="bookItem" key={`${book.id}-${index}`}>
            <img
              className="bookImage"
              src={
                book.picture.includes("http")
                  ? book.picture
                  : `${process.env.REACT_APP_API_URL}/${book.picture}`
              }
              alt={book.name}
            />
            <h3 className="bookTitle">{book.name}</h3>
            <p className="bookGenre">Genre: {genresMap[book.genreId]}</p>
            <p className="bookReleaseDate">
              {new Date(book.releaseDate).toLocaleDateString()}
            </p>
            <button className="bookDeleteButton" onClick={() => handleDeleteBook(book.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;