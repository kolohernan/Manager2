import { Outlet, useNavigation } from "react-router-dom";
import { Fragment } from "react";

const Layout = () => {
  const navigation = useNavigation();

  return (
    <Fragment>
      {navigation.state === "loading" && (
        <div className="alert alert-info my-5">Cargando...</div>
      )}
      <Outlet />
    </Fragment>
  );
};
export default Layout;
