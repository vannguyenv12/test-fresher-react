import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import TableUsers from "../components/TableUsers";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user && !user.auth)
    return <>You don't have permission to perform action</>;

  return <>{children}</>;
};

export default PrivateRoute;
