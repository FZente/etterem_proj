import { useEffect, useState } from "react";
import type { Restaurant } from "../type/Restaurant";
import type { Review } from "../type/Review";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";

function RestaurantPage() {
  const {id} = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id)
    apiClient
      .get(`/restaurants/${id}`)
      .then((response) => setRestaurant(response.data))
      .catch((result) => console.error(result));

    apiClient
      .get(`/reviews/restaurant/${id}`)
      .then(res => setReviews(res.data))
      .catch((result) => console.error(result));
  }, [id]);

  return (
    <>
      <div className="fo-oldal-avatar">
        <Avatar src="/public/logo.png" onClick={() => navigate(`/`)}/>
      </div>
      <h1>Restaurant</h1>
      <h2>{restaurant?.name}</h2>
      <h3>{restaurant?.description}</h3>

      <Grid container columns={12} spacing={2} sx={{ mt: 2 }}>
        {reviews.map((r) => (
          <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{r.rating}</Typography>
                <Typography>{r.comment}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default RestaurantPage;
