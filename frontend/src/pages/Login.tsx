import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, TextField } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        navigate("/");
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <>
      <h1>Login:</h1>
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
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </>
  );
}

export default Login;
