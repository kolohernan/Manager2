import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [clientesCC, setclientesCC] = useState(null);
  const [dominio, setDominio] = useState(null);
  const [token, setToken] = useState(null);

  // if (usuario) // false si nul

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
        clientesCC,
        setclientesCC,
        dominio,
        setDominio,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//aca creo un minihook, asi no hay que estar importando useContext y UserContext
export const useUserContext = () => useContext(UserContext);
