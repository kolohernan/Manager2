import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
        nombres,
        setNombres,
        apellidos,
        setApellidos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//aca creo un minihook, asi no hay que estar importando useContext y UserContext
export const useUserContext = () => useContext(UserContext);
