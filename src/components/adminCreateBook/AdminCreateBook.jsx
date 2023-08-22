import { useEffect, useState } from "react";
import React from "react";
import "./adminCreateBook.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminCreateBook = () => {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [genreId, setGenreId] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [picture, setPicture] = useState("");
  const [genresList, setGenresList] = useState([]);
  // Appel à la fonction pickGenres lors du chargement du composant
  useEffect(() => {
    pickGenres();
  }, []);

  const pickGenres = async () => {
    try {
      //l'appel à l'API pour pour la récupération de la liste des genres
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/genres`
      );
      setGenresList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // formuler controller sans form
  const handleSubmit = async () => {
    //Création d'un nouvel obje formData pour envoyé les données dans du formulaire
    const formData = new FormData();
    formData.append("name", name);
    formData.append("genreId", genreId);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("picture", picture[0]);

    try {
    // récupération du Jwt token de l'administrateur depuis le localStorage
      const adminJwt = localStorage.getItem("adminJwt");
      await axios.post(`${process.env.REACT_APP_API_URL}/books`, formData, {
        headers: {
          Authorization: `Bearer ${adminJwt}`,
        },
      });
      //redirection ver la page books, si la créatione est réussi
      navigator("/books");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'envoi du formulaire",
        error
      );
    }
  };

  return (
    <div className="createBookContainer">
      <ul className="createBookStyle">
        <label htmlFor="name">
          Name :
          <input
            id="name"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label htmlFor="genre">
          Genre :
          <select
            id="genreId"
            type="text"
            onChange={(event) => setGenreId(event.target.value)}
          >
            <option value="">Sélectionnez un genre</option>
            {genresList.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          Description :
          <textarea
            cols="40"
            rows="10"
            id="description"
            type="textarea"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label htmlFor="releaseDate">
          Release date :
          <input
            id="releaseDate"
            type="date"
            onChange={(event) => setReleaseDate(event.target.value)}
          />
        </label>
        <label htmlFor="picture">
          Picture :
          <input
            id="picture"
            type="file"
            onChange={(event) => setPicture(event.target.files)}
          />
        </label>
        <div className="buttonCreateBook">
          <button onClick={handleSubmit}>Envoyer</button>
        </div>
      </ul>
    </div>
  );
};

export default AdminCreateBook;
