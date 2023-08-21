import React, { useState, useEffect } from "react";
import axios from "axios";
import './updateGenre.css';
// import { useUser } from "../../context/UserContext"; // Importer le contexte utilisateur

const UpdateGenre = () => {
  // Retirez cette ligne si vous n'utilisez pas directement genresMap ici
  // const { genresMap } = useUser();
  
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    const retrieveGenres = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/genres`);
        setGenres(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des genres :", error);
      }
    };

    retrieveGenres();
  }, []);

  const handleGenreSelect = (id) => {
    const selected = genres.find((genre) => genre.id === id);
    setSelectedGenre(selected);
    setUpdatedName(selected.name);
  };

  const handleUpdateClick = async () => {
    if (selectedGenre) {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/genres/${selectedGenre.id}`, { name: updatedName });
        alert(`Genre ${selectedGenre.name} mis à jour avec succès !`);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du genre :", error);
      }
    }
  };

  return (
    <div className="containerUpdateGenre">
      <h2 className="titleGenreUpdate">Modifier un Genre</h2>
      <select className="selectFirstGenreUpdate" onChange={(e) => handleGenreSelect(parseInt(e.target.value))}>
        <option value="">Sélectionner un genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      {selectedGenre && (
        <div className="selectGenreUpdate">
          <h3>Genre sélectionné : {selectedGenre.name}</h3>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <button className=" buttonGenreUpdate" onClick={handleUpdateClick}>Mettre à jour</button>
        </div>
      )}
    </div>
  );
};

export default UpdateGenre;