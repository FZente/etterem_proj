import { useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

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

      <br />
      <button onClick={submit}>Hozzáadás</button>
    </>
  );
};

export default NewRestaurant;
