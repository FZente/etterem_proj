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

router.post("/", auth, (req, res) => {});

router.put("/:id", auth, (req, res) => {});
router.put("/:id", auth, (req, res) => {});
router.delete("/:id", auth, (req, res) => {});

export default router;
