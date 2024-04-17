import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function useAuth() {
  const { user } = useContext(AuthContext);

  return {
    user,
  };
}

export { useAuth };
