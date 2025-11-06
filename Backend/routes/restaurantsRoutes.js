import { Router } from "express";
import * as Restaurants from "../data/restaurant.js";
import { auth } from "./usersRoutes.js";

const router = Router();

router.get("/", (req, res) => {
  const restaurants = Restaurants.GetAllRestaurants();
  res.json(restaurants);
});

router.get("/:id", (req, res) => {
  const rest = Restaurants.GetRestaurantById(+req.params.id);
  if (!rest) {
    return res.status(404).json({ message: "Restaurant not found!" });
  }
  res.json(rest);
});

router.post("/", auth, (req, res) => {});

router.put("/:id", auth, (req, res) => {});
router.put("/:id", auth, (req, res) => {});
router.delete("/:id", auth, (req, res) => {});

export default router;
