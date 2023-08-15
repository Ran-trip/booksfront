// import React from "react";
// import { useUser } from "../../context/UserContext";
// import { useParams } from "react-router-dom";

// const Genre = () => {
//   const { genreId } = useParams();
//   const genreName = useUser().genresMap[parseInt(genreId)];

//   return <div>Genre: {genreName}</div>;
// };

// export default Genre;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useBooks } from "../../context/BooksContext"; // Importer le contexte des livres
import { useUser } from "../../context/UserContext"; // Importer le contexte utilisateur
import "./genre.css";

const Genre = () => {
  const { genreId } = useParams();
  const { genresMap } = useUser(); // Utiliser le genresMap du contexte utilisateur
  const { booksList, setBooksList, handleBookClick } = useBooks(); // Utiliser le contexte des livres

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
    <div>
      <div>Genre: {genresMap[parseInt(genreId)]}</div>
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
    </div>
  );
};

export default Genre;
