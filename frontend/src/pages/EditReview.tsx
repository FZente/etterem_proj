import { useEffect, useState } from "react";
import type { Review } from "../type/Review";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState<Review>({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    apiClient
      .get(`/reviews/${id}`)
      .then((res) => setReview(res.data))
      .catch(() => toast.error("Az éttermek betöltése sikertelen volt"));
  }, [id]);

  const submit = () => {
    const dto = {
      rating: review.rating,
      comment: review.comment,
    };

    apiClient
      .put(`/reviews/${id}`, dto)
      .then(() => toast.success("Sikeres szerkesztés!"))
      .catch(() => toast.error("Sikertelen szerkesztés!"));
  };

  return (
    <>
      <div className="fo-oldal-avatar">
        <Avatar src="/public/logo.png" onClick={() => navigate(`/`)}/>
      </div>
      <h1>Értékelés:</h1>
      <input
        type="number"
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
      <button onClick={submit}>Szerkesztés</button>
    </>
  );
};

export default EditReview;