import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    apiClient
      .post(`/users/login`, { email, password })
      .then(async (response) => {
        const token = response.data;
        localStorage.setItem("token", token);
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userId = decoded.id;
        const userResponse = await apiClient.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        navigate("/");
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <>
      <div className="fo-oldal-avatar">
        <Avatar src="/public/logo.png" onClick={() => navigate(`/`)} sx={{ width: 56, height: 56 }}/>
      </div>
      <h1>Login:</h1>
      <h2>Email:</h2>
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <h2>Password:</h2>
      <input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={onSubmit}>Login</button>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "40px" }}>
        <p>If you have a registered profil: </p>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </>
  );
}

export default Login;
