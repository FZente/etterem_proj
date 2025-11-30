import { useState } from "react";
import type { User } from "../type/User";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, TextField } from "@mui/material";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    <h1>Create a new account:</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Card sx={{ width: 350, backgroundColor: "white" }}>
          <CardContent>
            <TextField
              label="Név"
              type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              fullWidth
              inputProps={{ min: 1, max: 5 }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
              inputProps={{ min: 1, max: 5 }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />

            <div style={{ marginBottom: "16px"}}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label style={{ marginLeft: "8px" }}>
                Show Password
              </label>
            </div>

            <Button variant="contained" fullWidth onClick={onSubmit}>
              Küldés
            </Button>
          </CardContent>
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "40px",
        }}
      >
        <p>If you have a registered profil: </p>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </>
  );
}

export default Register;
