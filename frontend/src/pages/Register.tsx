import { useState } from "react";
import type { User } from "../type/User";
import apiClient from "../api/apiClient";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    const u: User = {
      name,
      email,
      password,
    };

    apiClient
      .post(`/users/register`, u)
      .then((response) => alert(response.status))
      .catch((result) => console.error(alert(result)));
  };

  return (
    <>
      <h1>Registration:</h1>
      <h2>Name:</h2>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
      <button onClick={onSubmit}>Registration</button>
    </>
  );
}

export default Register;
