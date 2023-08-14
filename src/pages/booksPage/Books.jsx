import React, { useEffect, useState } from "react";
import "./books.css";
import axios from "axios";

const Books = () => {
  const [booksList, setBooksList] = useState([]);
  const [genresMap, setGenresMap] = useState({}); // un état pour stockers les genres

  useEffect(() => {
    const retrieveBooks = async () => {
      //try catch explication pas toujours necessaire
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/books`
        );
        setBooksList(data);
      } catch (error) {
        console.error("livre non récupéré", error); //Explication
      }
    };

    const retrieveGenres = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/genres`
        );
        const genresMap = data.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {});
        setGenresMap(genresMap);
      } catch (error) {
        console.error("genre non récupéré", error);
      }
    };

    retrieveGenres();
    retrieveBooks();
  }, []);

  return (
    <div className="containerBooks">
      {booksList.map((book) => (
        <div className="cardBooks" key={book.id}>
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
