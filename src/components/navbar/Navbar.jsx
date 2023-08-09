import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link, NavLink } from "react-router-dom";

import "./navbar.css";
import axios from "axios";

import logo from "../../assets/logos.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, admin } = useUser();
  const [genres, SetGenres] = useState([]);
  const [isOnGenres, setisOnGenres] = useState(false);

  useEffect(() => {
    const callGenres = async () => {
      try {
        const { data: genresApi } = await axios.get(`${process.env.REACT_APP_API_URL}/genres`);
        SetGenres(genresApi);
      } catch (error) {
        // Gérer les erreurs si nécessaire
        console.error("Une erreur s'est produite lors de la récupération des genres :", error);
      }
    };
  
    callGenres();
  }, []);

  return (
    <nav>
      <Link to="/" className="logo">
        {" "}
        <img src={logo} alt="Books Love Logo" className="logoStyle" />{" "}
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {!user && !admin && (
          <>
            <li>
              {" "}
              <NavLink to="/" className="title">
                Accueil
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/livres">Livres</NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/contact">Contact</NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/creationaccount">Créer un compte</NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/login">Login</NavLink>{" "}
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              {" "}
              <NavLink to="/">Accueil</NavLink>{" "}
            </li>
            <li>
              <div
              className="customList"
              onMouseEnter={() => setisOnGenres(true)}
              onMouseLeave={() => setisOnGenres(false)}
              onClick={() => setisOnGenres(!isOnGenres)}
              
              >
              {" "}
              <NavLink
              
                to="/livres"
                
              >
                Livres
              </NavLink>
              {" "}
              <div className="genresList" >
              {
                isOnGenres && genres.map((genre) => (
                <p className="genreStyle" key={genre.id}>{genre.name}</p>
              ))}

              </div>

              </div>
            </li>
            <li>
              {" "}
              <NavLink to="/bookslist">Liste de Livres</NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/contact">Contact</NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/disconnected">Déconnecté</NavLink>{" "}
            </li>
          </>
        )}
        {admin && (
          <>
            <li>
              {" "}
              <NavLink to="/admin/photo">Ajouter Photo livre</NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/admin/genres">Modification Genre</NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/disconnected">Déconnexion Admin</NavLink>{" "}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
