import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import image1 from "../../assets/livreAcceuil2.jpg";
import image2 from "../../assets/livreAccueil.jpg";
import image3 from "../../assets/livreAccueil3.jpg";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image1, image2, image3];

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length]);

  const goToPreviousSlide = useCallback(() => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length]);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 4000); // Auto-advance every 5 seconds
    return () => clearInterval(interval);
  }, [goToNextSlide]);
  

  return (
    <div className="homeContainer">
      <h1 className="titleHome">Bienvenue sur Books Love</h1>
      <div className="containerCarrousel">
        <div className="carousel">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carouselItem ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <img src={image} alt={`défilementDimage ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="carouselControls">
          <button className="prevButton" onClick={goToPreviousSlide}>
            &#8249;
          </button>
          <button className="nextButton" onClick={goToNextSlide}>
            &#8250;
          </button>
        </div>
      </div>
      <p className="carouselText">
      Bienvenue sur Books Love. Inscrivez-vous et créez votre liste pour aller faire vos achats.
      C'est partie !!
      </p>
      <Link to="/books"  className="centerButton">
        <button className=" homeButton">Nos Livres !</button>
      </Link>

    </div>
  );
};

export default Home;
