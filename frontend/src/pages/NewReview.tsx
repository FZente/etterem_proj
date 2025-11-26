import { useState, useEffect } from "react";
import type { Review } from "../type/Review";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const NewReview = () => {
  const [review, setReview] = useState<Review>({
    rating: 1,
    comment: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      toast.error("Először jelentkezz be!");
      navigate("/login");
    }
  }, []);

  const validate = () => {
    if (review.rating < 1 || review.rating > 5) {
      toast.error("A rating csak 1 és 5 között lehet!");
      return false;
    }
    if (review.comment.trim() === "") {
      toast.error("A comment nem lehet üres!");
      return false;
    }
    return true;
  };

  const submit = () => {
    console.log("Submit gomb megnyomva");
    if (!user || !user.id) {
      console.log("User nincs bejelentkezve");
      toast.error("Először jelentkezz be!");
      navigate("/login");
      return;
    }
    if (!id) {
      console.log("Nincs restaurant ID");
      toast.error("Hiba: nem található étterem ID!");
      return;
    }
    if (!validate()) return;

    console.log("POST küldése...", {
      review,
      user_id: user.id,
      restaurant_id: id,
    });

    apiClient
      .post("/reviews", {
        ...review,
        user_id: user.id,
        restaurant_id: Number(id),
      })
      .then(() => {
        console.log("Sikeres POST");
        toast.success("Sikeres értékelés!");
        navigate(`/restaurant/${id}`);
      })
      .catch((err) => {
        console.error("POST hiba:", err.response?.data || err);
        toast.error("Sikertelen hozzáadás!");
      });
  };

  return (
    <>
      <h1>Új értékelés</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Card sx={{ width: 350, backgroundColor: "white" }}>
          <CardContent>
            <TextField
              label="Rating (1-5)"
              type="number"
              value={review.rating}
              onChange={(e) =>
                setReview({ ...review, rating: Number(e.target.value) })
              }
              fullWidth
              inputProps={{ min: 1, max: 5 }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Comment"
              multiline
              rows={3}
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button variant="contained" fullWidth onClick={submit}>
              Küldés
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewReview;
