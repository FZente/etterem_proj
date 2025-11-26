import { useEffect, useState } from "react";
import type { User } from "../type/User";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";

function Profil() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/users/${Number(id)}`)
      .then((response) => setUser(response.data))
      .catch((result) => console.error(alert(result)));
  }, []);

  return (
    <>
      <h1>Profil:</h1>
      <h2>{user?.name}</h2>
      <h3>{user?.email}</h3>

      {user?.role === "admin" && (
        <button onClick={() => navigate("/new-restaurant")}>
          + Új étterem
        </button>
      )}
    </>
  );
}

export default Profil;
