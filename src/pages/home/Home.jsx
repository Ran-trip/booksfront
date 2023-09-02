import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

import homeImage from "../../assets/homeImage.jpg"; 

const Home = () => {
  return (
    <div className="homeContainer">
      <img
        src={homeImage} 
        alt="home"
        className="homeImage"
      />
      <p className="homeText">
        Bienvenue sur Books Love. Inscrivez-vous et créez votre liste pour aller
        faire vos achats. C'est parti !!
      </p>
      <Link to="/books" className="centerButton">
        <button className="homeButton">Nos Livres !</button>
      </Link>
    </div>
  );
};

export default Home;
