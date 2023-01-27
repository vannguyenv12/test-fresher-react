import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import TableUsers from "../components/TableUsers";
import PrivateRoute from "./PrivateRoute";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoute;
