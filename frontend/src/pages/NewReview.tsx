import { useState } from "react";
import type { Review } from "../type/Review";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const NewReview = () => {
  const [review, setReview] = useState<Review>({
    rating: 0,
    comment: "",
  });

  const submit = () => {
    apiClient
      .post("/reviews", review)
      .then(() => toast.success("Sikeres hozzáadás!"))
      .catch(() => toast.error("Sikertelen hozzáadás!"));
  };

  return (
    <>
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