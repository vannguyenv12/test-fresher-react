import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import AppRoute from "./routes/AppRoute";

function App() {
  const { user, login } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      login(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoute />
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
