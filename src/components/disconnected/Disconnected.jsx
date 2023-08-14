import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Disconnected = () => {
  const { setUser, setAdmin } = useUser();

  useEffect(() => {
    // Supprimer le JWT du localStorage lors de la déconnexion
    localStorage.removeItem("jwt");
    
    // Réinitialiser les états de l'utilisateur et de l'administrateur
    setUser(null);
    setAdmin(null);
  }, [setUser, setAdmin]);

  return <Navigate to="/" />;
};

export default Disconnected;
