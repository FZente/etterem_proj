import { useState } from "react";
import type { Restaurant } from "../type/Restaurant";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const NewRestaurant = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>({
    name: "",
    description: "",
    location: "",
    average_rating: 0,
  });

  const navigate = useNavigate();

  const submit = () => {
    apiClient
      .post("/restaurants", restaurant)
      .then(() => toast.success("Sikeres hozzáadás!"))
      .catch(() => toast.error("Sikertelen hozzáadás!"));
  };

  return (
    <>
      <div className="fo-oldal-avatar">
        <Avatar src="/public/logo.png" onClick={() => navigate(`/`)} sx={{ width: 56, height: 56 }}/>
      </div>
      <h1>Név:</h1>
      <input
        type="text"
        value={restaurant.name}
        onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
      />

      <h1>Leírás</h1>
      <input
        type="text"
        value={restaurant.description}
        onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })}
      />

      <h1>Hely</h1>
      <input
        type="number"
        value={restaurant.location}
        onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })}
      />

      <h1>Átlag étrékelés</h1>
      <input
        type="text"
        value={restaurant.average_rating}
        onChange={(e) => setRestaurant({ ...restaurant, average_rating: Number(e.target.value) })}
      />

      <br />
      <button onClick={submit}>Hozzáadás</button>
    </>
  );
};

export default NewRestaurant;