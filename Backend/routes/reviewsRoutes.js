import { Router } from "express";
import * as Reviews from "../data/review.js";

const router = Router();

router.get("/", (req, res) => {
  const reviews = Reviews.getAllReviews();
  res.json(reviews);
});

router.get("/:id", (req, res) => {
  const rev = Reviews.getReviewsById(+req.params.id);
  if (!rev) {
    return res.status(404).json({ message: "Review not found!" });
  }
  res.json(rev);
});

router.get("/restaurant/:id", (req, res) => {
  const restaurantId = +req.params.id;
  const reviews = Reviews.getReviewsByRestaurantId(restaurantId);
  res.json(reviews || []);
});

router.post("/", (req, res) => {
  const { rating, comment, user_id, restaurant_id } = req.body;

  if (!rating || !comment || !user_id || !restaurant_id) {
    return res.status(400).json({ message: "Missing required data" });
  }

  const saved = Reviews.saveReview(rating, comment, user_id, restaurant_id);
  const rev = Reviews.getReviewsById(saved.lastInsertRowid);
  res.json(rev);
});

// router.put("/:id", (req, res) => {
//   const id = +req.params.id;
//   let rev = Reviews.getReviewsById(id);
//   if (!rev) {
//     return res.status(404).json({ message: "Review not found!" });
//   }
//   const { rating, comment } = req.body;
//   if (!rating || !comment) {
//     return res.status(400).json({ message: "Missing required data" });
//   }
//   Reviews.updateReview(id, rating, comment);
//   rev = Reviews.getReviewsById(id);
//   res.json(rev);
// });

// router.patch("/:id", (req, res) => {
//   const id = +req.params.id;
//   let rev = Reviews.getReviewsById(id);
//   if (!rev) {
//     return res.status(404).json({ message: "Review not found!" });
//   }
//   const { rating, comment } = req.body;
//   Reviews.updateReview(id, rating || rev.rating, comment || rev.comment);
//   rev = Reviews.getReviewsById(id);
//   res.json(rev);
// });

// router.delete("/:id", (req, res) => {
//   const id = +req.params.id;
//   const rev = Reviews.getReviewsById(id);
//   if (!rev) {
//     return res.status(404).json({ message: "Review not found" });
//   }
//   Reviews.deleteReview(id);
//   res.sendStatus(204);
// });

export default router;
