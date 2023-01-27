import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../services/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    const res = await loginUser(email, password);
    if (res && res.token) {
      login(email, res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container col-6 col-sm-4">
      <div className="title">Log in </div>
      <div className="text">Email or username (eve.holt@reqres.in)</div>

      <input
        type="text"
        placeholder="Email or Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="input-password">
        <input
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          onClick={() => setIsShowPassword(!isShowPassword)}
          className={
            isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
          }
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
      >
        {isLoading && <i className="fa-solid fa-sync fa-spin"></i>} Login
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i>{" "}
        <span onClick={() => navigate("/")}>Go back</span>
      </div>
    </div>
  );
};

export default Login;
