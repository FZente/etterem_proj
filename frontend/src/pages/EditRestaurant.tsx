import { useEffect, useState } from "react";
import type { Restaurant } from "../type/Restaurant";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      .put(`/restaurants/${id}`, dto)
      .then(() => toast.success("Sikeres szerkesztés!"))
      .catch(() => toast.error("Sikertelen szerkesztés!"));
  };

  return (
    <>
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
        onChange={(e) =>
          setRestaurant({ ...restaurant, description: e.target.value })
        }
      />

      <h1>Hely</h1>
      <input
        type="text"
        value={restaurant.location}
        onChange={(e) =>
          setRestaurant({ ...restaurant, location: e.target.value })
        }
      />

      <h1>Átlag értékelés</h1>
      <input
        type="number"
        value={restaurant.average_rating}
        onChange={(e) =>
          setRestaurant({
            ...restaurant,
            average_rating: Number(e.target.value),
          })
        }
      />

      <br />
      <button onClick={submit}>Szerkesztés</button>
    </>
  );
};

export default EditRestaurant;
