import { useEffect, useState } from "react";
import type { Restaurant } from "../type/Restaurant";
import type { Review } from "../type/Review";
import type { User } from "../type/User";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/restaurants/${id}`)
      .then((response) => setRestaurant(response.data))
      .catch((result) => console.error(result));

    apiClient
      .get(`/reviews/restaurant/${id}`)
      .then((res) => setReviews(res.data))
      .catch((result) => console.error(result));
  }, [id]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleButtonClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    } else {
      navigate(`/restaurants/${restaurant?.id}/review`);
      return;
    }
    console.log("Button működik, felhasználó bejelentkezett!");
  };

  const deleteRestaurant = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Nincs bejelentkezve!");
    return;
  }

  apiClient
    .delete(`/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert("Sikeres törlés!");
      navigate("/"); // vissza a listára
    })
    .catch((err) => {
      console.error(err);
      alert("Sikertelen törlés!");
    });
};

  return (
    <>
      <h1>Restaurant</h1>
      {user?.role === "admin" && (
        <Button
          variant="outlined"
          onClick={() => navigate(`/edit-restaurant/${id}`)}
        >
          Szerkesztés
        </Button>
      )}
      {user?.role === "admin" && (
        <Button variant="outlined" onClick={deleteRestaurant}>
          Törlés
        </Button>
      )}
      <h2>{restaurant?.name}</h2>
      <h3>{restaurant?.description}</h3>

      <Button variant="outlined" onClick={handleButtonClick}>
        Write Review
      </Button>
      <Grid
        container
        spacing={3}
        sx={{ mt: 2 }}
        size={{ xs: 12, sm: 6, md: 4 }}
      >
        {reviews.map((r) => (
          <Card>
            <CardContent>
              <Typography>
                {r.created_at
                  ? new Date(r.created_at).toLocaleString("hu-HU")
                  : ""}
              </Typography>
              <Typography variant="h6">{r.rating}</Typography>
              <Typography>{r.comment}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </>
  );
}

export default RestaurantPage;
