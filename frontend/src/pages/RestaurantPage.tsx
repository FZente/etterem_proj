import { useEffect, useState } from "react";
import type { Restaurant } from "../type/Restaurant";
import apiClient from "../api/apiClient";
import { useParams } from "react-router-dom";

function RestaurantPage() {
    const {id} = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();

  useEffect(() => {
    apiClient
      .get(`/restaurants/${Number(id)}`)
      .then((response) => setRestaurant(response.data))
      .catch((result) => console.error(alert(result)));
  }, [id]);

  return <>
    <h1>Egy restaurant</h1>
    <h2>{restaurant?.name}</h2>
    <h3> {restaurant?.description}</h3>
    </>
}

export default RestaurantPage;
