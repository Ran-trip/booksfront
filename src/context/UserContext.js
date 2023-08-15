import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// son role c'est de gérer l'état
//créer un context
const UserContext = createContext(null);

//childen récupérer des composant à l'interrieur d'autre composant
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [admin, setAdmin] = useState(
    localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin"))
      : null
  );
  const [genresMap, setGenresMap] = useState({}); // Ajouter l'état des genres

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
 // la même chose mais avec l'admin
  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    } else {
      localStorage.removeItem("admin");
    }
  }, [admin]);

  useEffect(() => {
    const retrieveGenres = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/genres`
        );
        const genresMap = {};
        data.forEach((genre) => {
          genresMap[genre.id] = genre.name;
        });

        setGenresMap(genresMap);
      } catch (error) {
        console.error("genre non récupéré", error);
      }
    };

    retrieveGenres();
  }, []); // Charger les genres une seule fois
// retourne le provider avec les enfants
  return (
    <UserContext.Provider value={{ user, setUser, admin, setAdmin, genresMap }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
