import { useEffect } from "react";

const Dashboard = () => {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return "Dashboard";
};
export default Dashboard;
