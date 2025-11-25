import { useState } from "react";
import type { User } from "../type/User";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="fo-oldal-avatar">
        <Avatar
          src="/public/logo.png"
          onClick={() => navigate(`/`)}
          sx={{ width: 56, height: 56 }}
        />
      </div>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card sx={{ maxWidth: 345, margin: "auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <h3>Create a new account:</h3>
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h2>Name:</h2>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h2>Email:</h2>
              <input
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h2>Password:</h2>
              <input
                type="text"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <button onClick={onSubmit}>Registration</button>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

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
