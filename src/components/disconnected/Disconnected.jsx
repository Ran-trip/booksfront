import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Disconnected = () => {
  const { setUser, setAdmin } = useUser();

  useEffect(() => {
    setUser(null);
  }, [setUser]);

  useEffect(() => {
    setAdmin(null);
  }, [setAdmin]);

  return <Navigate to="/" />;
};

export default Disconnected;
