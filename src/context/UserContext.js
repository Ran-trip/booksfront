import { createContext, useContext, useEffect, useState } from "react";

// son role c'est de gérer l'état
//créer un context
const UserContext = createContext(null);

//childen récupérer des composant à l'interrieur d'autre composant
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  ); //Etat
  const [admin, setAdmin] = useState(
    localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin"))
      : null
  );

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
  // retourne le provider avec les enfants
  return (
    <UserContext.Provider value={{ user, setUser, admin, setAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
//hook qui permet de l'utiliser n'importe ou
export const useUser = () => useContext(UserContext);

export default UserProvider;
