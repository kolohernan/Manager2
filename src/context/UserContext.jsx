import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [clientesCC, setclientesCC] = useState(null);
  const [dominio, setDominio] = useState(null);
  const [token, setToken] = useState(null);
  const [urlDominio, SeturlDominio] = useState(null);
  const [key, setKey] = useState(null);
  const [Css, setCss] = useState(false);
  const [login, setLogin] = useState(null);
  const [fav, setFav] = useState(null);
  const [txtfooter, setTxtfooter] = useState(null);

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
        urlDominio,
        SeturlDominio,
        key,
        setKey,
        Css,
        setCss,
        login,
        setLogin,
        fav,
        setFav,
        txtfooter,
        setTxtfooter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//aca creo un minihook, asi no hay que estar importando useContext y UserContext
export const useUserContext = () => useContext(UserContext);
