import { useEffect, useState } from "react";
import type { Restaurant } from "../type/Restaurant";
import type { Review } from "../type/Review";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Rating,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();
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

  return (
    <>
      <h1>{restaurant?.name}</h1>
      <h3>{restaurant?.description}</h3>

      <Button variant="outlined" onClick={handleButtonClick}>
        Write Review
      </Button>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {reviews.map((r) => (
          <Card>
            <CardContent>
              <Typography>
                {r.created_at
                  ? new Date(r.created_at).toLocaleString("hu-HU")
                  : ""}
              </Typography>
              <Rating name="read-only" value={r.rating} readOnly />
              <Typography>{r.comment}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </>
  );
}

export default RestaurantPage;
