import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // if (usuario) // false si nul

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//aca creo un minihook, asi no hay que estar importando useContext y UserContext
export const useUserContext = () => useContext(UserContext);
