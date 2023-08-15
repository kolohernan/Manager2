import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cadenaArticulo, setCadenaArticulo] = useState("");
  const [cadenaArticulo2, setCadenaArticulo2] = useState("");

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
        nombres,
        setNombres,
        apellidos,
        setApellidos,
        cadenaArticulo,
        setCadenaArticulo,
        cadenaArticulo2,
        setCadenaArticulo2
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//aca creo un minihook, asi no hay que estar importando useContext y UserContext
export const useUserContext = () => useContext(UserContext);
