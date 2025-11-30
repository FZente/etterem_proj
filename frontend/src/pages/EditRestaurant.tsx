import { useEffect, useState } from "react";
import type { Restaurant } from "../type/Restaurant";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Card, CardContent, Button, TextField } from "@mui/material";

const EditRestaurant = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState<Restaurant>({
    name: "",
    description: "",
    location: "",
    average_rating: 0,
  });

  useEffect(() => {
    apiClient
      .get(`/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch(() => toast.error("Az éttermek betöltése sikertelen volt"));
  }, [id]);

  const submit = () => {
    const dto = {
      name: restaurant.name,
      description: restaurant.description,
      location: restaurant.location,
      average_rating: restaurant.average_rating,
    };

    apiClient
      .put(`/restaurants/${id}`, dto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => toast.success("Sikeres szerkesztés!"))
      .catch(() => toast.error("Sikertelen szerkesztés!"));
  };

  return (
    <>
    <h1>Étterem szerkesztés</h1>
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
              value={restaurant.name}
              onChange={(e) =>
                setRestaurant({ ...restaurant, name: e.target.value })
              }
              fullWidth
              inputProps={{ min: 1, max: 5 }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Leírás"
              multiline
              rows={3}
              value={restaurant.description}
              onChange={(e) =>
                setRestaurant({ ...restaurant, description: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Helyszín"
              type="text"
              value={restaurant.location}
              onChange={(e) =>
                setRestaurant({ ...restaurant, location: e.target.value })
              }
              fullWidth
              inputProps={{ min: 1, max: 5 }}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" fullWidth onClick={submit}>
              Küldés
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditRestaurant;
