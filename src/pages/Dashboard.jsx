import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const Dashboard = () => {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const { nombres, apellidos } = useUserContext();

  return (
    <>
      <h5>
        Bienvenido {nombres} {apellidos}
      </h5>
    </>
  );
};
export default Dashboard;
