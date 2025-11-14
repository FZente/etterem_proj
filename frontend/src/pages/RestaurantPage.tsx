import { useEffect, useState } from "react";
import type { Restaurant } from "../type/Restaurant";
import type { Review } from "../type/Review";
import apiClient from "../api/apiClient";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';

function RestaurantPage() {
  const {id} = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    console.log(id)
    apiClient
      .get(`/restaurants/${id}`)
      .then((response) => setRestaurant(response.data))
      .catch((result) => console.error(result));

    apiClient
      .get(`/reviews/restaurant/${id}`)
      .then((response) => setReviews(response.data))
      .catch((result) => console.error(result));
  }, []);

  return (<>
    <h1>Egy restaurant</h1>
    <h2>{restaurant?.name}</h2>
    <h3> {restaurant?.description}</h3>

        <Grid container spacing={3} justifyContent="center" sx={{ padding: 2 }}>
      {reviews.map((r) => (
        <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ maxWidth: 345, margin: "auto" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {r?.rating}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {r?.comment}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>)
}

export default RestaurantPage;
