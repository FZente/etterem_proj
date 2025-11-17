import { useEffect, useState } from "react";
import type { Review } from "../type/Review";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditReview = () => {
  const { id } = useParams();

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