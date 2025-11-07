import { useState } from "react";
import type { User } from "../type/User";
import apiClient from "../api/apiClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    </>
  );
}

export default Login;
