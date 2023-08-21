import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const BooksContext = createContext(null);

const BooksProvider = ({ children }) => {
  const { genresMap } = useUser(); // Utilisation du genresMap de userContext
  const [booksList, setBooksList] = useState([]); // Gére l'état des livres

  useEffect(() => {
    const retrieveBooks = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/books`
        );
        setBooksList(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
      }
    };

    retrieveBooks();
  }, []);

  // une fonction pour ajouter un livre sélectionné au localStorage
  const handleBookClick = (book) => {
    const selectedBooks =
      JSON.parse(localStorage.getItem("selectedBooks")) || [];
    const selectedGenres =
      JSON.parse(localStorage.getItem("selectedGenres")) || {};

    selectedBooks.push(book);
    selectedGenres[book.id] = genresMap[book.genreId];

    localStorage.setItem("selectedBooks", JSON.stringify(selectedBooks));
  };

  return (
    <BooksContext.Provider
      value={{ booksList, setBooksList, handleBookClick, genresMap }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);

export default BooksProvider;
