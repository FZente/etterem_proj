import { useEffect, useState } from "react";
import type { Restaurant } from "./type/Restaurant";
import "./App.css";
import apiClient from "./api/apiClient";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import type { User } from "./type/User";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    apiClient
      .get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((result) => console.error(alert(result)));
  }, []);

  return (
    <>
    <div className="fo-oldal-avatar">
      <Avatar src="/public/logo.png" onClick={() => navigate(`/`)} sx={{ width: 56, height: 56 }}/>
    </div>
    <div className="top-right-buttons">
    {user ? (
      <Avatar
        onClick={() => navigate(`/profile/${user.id}`)}
        sx={{ cursor: "pointer" }}
      >
      </Avatar>
    ) : (
      <>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Registration</button>
      </>
    )}
  </div>
      <Grid container spacing={3} justifyContent="center" sx={{ padding: 2 }}>
  {restaurants.map((r) => (
    <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card sx={{ maxWidth: 345, margin: "auto" }}>
        <CardActionArea onClick={() => navigate(`/restaurant/${r?.id}`)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {r?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {r?.description}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {r?.average_rating}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ))}
</Grid>
    </>
  );
}

export default App;
