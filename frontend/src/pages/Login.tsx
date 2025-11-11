import { useState } from "react";
import type { User } from "../type/User";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    const u: Partial<User> = {
      email,
      password,
    };

    apiClient
      .post(`/users/login`, u)
      .then((response) => alert(response.status))
      .catch((result) => console.error(alert(result)));
  };

  return (
    <>
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
