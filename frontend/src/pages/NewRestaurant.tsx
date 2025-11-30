import { useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Card, CardContent, Button, TextField } from "@mui/material";

const NewRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    location: "",
  });

  const submit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Nincs bejelentkezve!");
        return;
      }

      await apiClient.post(
        "/restaurants",
        {
          name: restaurant.name,
          description: restaurant.description,
          location: restaurant.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Sikeres hozzáadás!");
      setRestaurant({ name: "", description: "", location: "" }); // reset
    } catch (error) {
      console.error(error);
      toast.error("Sikertelen hozzáadás!");
    }
  };

  return (
    <>
    <h1>Új étterem</h1>
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

export default NewRestaurant;
