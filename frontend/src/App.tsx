import { useEffect, useState } from "react";
import type { Restaurant } from "./type/Restaurant";
import "./App.css";
import apiClient from "./api/apiClient";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    apiClient
      .get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((result) => console.error(alert(result)));
  }, []);

  return (
    <>
      {restaurants.map((r) => (
        <div>
          <h1>{r?.name}</h1>
          <p>{r?.description}</p>
        </div>
      ))}
    </>
  );
}

export default App;
