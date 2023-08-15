import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useBooks } from "../../context/BooksContext"; // Importer le contexte des livres
import "./books.css";

const Books = () => {
  const { booksList, setBooksList, handleBookClick, genresMap } = useBooks(); // Utiliser le contexte des livres
  const { genreId } = useParams();

  useEffect(() => {
    const retrieveBooks = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/books`
        );
        const filteredBooks = genreId
          ? data.filter((book) => book.genreId === parseInt(genreId))
          : data;

        // Mettre à jour la liste des livres dans le contexte
        setBooksList(filteredBooks);
      } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
      }
    };

    retrieveBooks();
  }, [genreId, setBooksList]);

  return (
    <div className="containerBooks">
      {booksList.map((book) => (
        <div
          className="cardBooks"
          key={book.id}
          onClick={() => handleBookClick(book)}
        >
          <img
            className="imageBooks"
            width="200px"
            src={
              book.picture.includes("http")
                ? book.picture
                : `${process.env.REACT_APP_API_URL}/${book.picture}`
            }
            alt={book.name}
          />
          <div className="detailBook">
            <h2 className="titleBook">{book.name}</h2>
            <p>{genresMap[book.genreId]}</p>
            <p className="releaseBook">
              {new Date(book.releaseDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;