import { useState } from "react";
import type { Review } from "../type/Review";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const NewReview = () => {
  const [review, setReview] = useState<Review>({
    rating: 0,
    comment: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); 
  const user = JSON.parse(localStorage.getItem("user") || "{}"); 

  const submit = () => {
    apiClient
      .post("/reviews", {
        ...review,
        user_id: user.id,
        restaurant_id: Number(id)
      })
      .then(() => toast.success("Sikeres hozzáadás!"))
      .catch(() => toast.error("Sikertelen hozzáadás!"));
  };

  return (
    <>
      <div className="fo-oldal-avatar">
        <Avatar src="/public/logo.png" onClick={() => navigate(`/`)} sx={{ width: 56, height: 56 }}/>
      </div>
      <h1>Értékelés:</h1>
      <input
        type="text"
        value={review.rating}
        onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
      />

      <h1>Comment</h1>
      <input
        type="text"
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
      />

      <br />
      <button onClick={submit}>Hozzáadás</button>
    </>
  );
};

export default NewReview;