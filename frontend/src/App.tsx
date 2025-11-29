import { useEffect, useState } from "react";
import type { Restaurant } from "./type/Restaurant";
import "./App.css";
import apiClient from "./api/apiClient";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

  useEffect(() => {
    apiClient
      .get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((result) => console.error(alert(result)));
  }, []);

  const filteredRestaurants = restaurants.filter((r) => {
  const text = search.toLowerCase();
  return (
    r.name.toLowerCase().includes(text) ||
    r.location?.toLowerCase().includes(text)
  );
});

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ padding: 2 }}
        size={{ xs: 12, sm: 6, md: 4 }}
      >
        {filteredRestaurants.map((r) => (
          <Card key={r.id} sx={{ maxWidth: 345, margin: "auto" }}>
            <CardActionArea onClick={() => navigate(`/restaurant/${r?.id}`)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {r?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {r?.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {r?.location}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {r?.average_rating.toFixed(1)} ⭐
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </>
  );
}

export default App;
