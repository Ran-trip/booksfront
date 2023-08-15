import React, { useEffect, useState } from "react";
import { useUser } from '../../context/UserContext';
import axios from "axios";
import "./books.css";

const Books = () => {
  const [booksList, setBooksList] = useState([]);
  const { genresMap } = useUser(); // Utiliser le genresMap du contexte utilisateur

  useEffect(() => {
    const retrieveBooks = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/books`
        );
        setBooksList(data);
      } catch (error) {
        console.error("livre non récupéré", error);
      }
    };

    retrieveBooks();
  }, []);

  const handleBookClick = (book) => {
    const selectedBooks = JSON.parse(localStorage.getItem("selectedBooks")) || [];
    const selectedGenres = JSON.parse(localStorage.getItem("selectedGenres")) || {};

    selectedBooks.push(book);
    selectedGenres[book.id] = genresMap[book.genreId];

    localStorage.setItem("selectedBooks", JSON.stringify(selectedBooks));
  };

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