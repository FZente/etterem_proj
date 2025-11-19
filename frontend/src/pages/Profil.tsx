import { useEffect, useState } from "react";
import type { User } from "../type/User";
import apiClient from "../api/apiClient";
import { Avatar } from "@mui/material";
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
      <div className="fo-oldal-avatar">
        <Avatar src="/public/logo.png" onClick={() => navigate(`/`)} sx={{ width: 56, height: 56 }}/>
      </div>

      <h1>Profil:</h1>
      <h2>{user?.name}</h2>
      <h3>{user?.email}</h3>
    </>
  );
}

export default Profil;
