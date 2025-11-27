import { Router } from "express";
import * as Restaurants from "../data/restaurant.js";
import { auth } from "./usersRoutes.js";

const router = Router();

router.get("/", (req, res) => {
  const restaurants = Restaurants.getAllRestaurants();
  res.json(restaurants);
});

router.get("/:id", (req, res) => {
  const rest = Restaurants.getRestaurantById(+req.params.id);
  if (!rest) {
    return res.status(404).json({ message: "Restaurant not found!" });
  }
  res.json(rest);
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  const rest = Restaurants.getRestaurantByName(name);
  if (!rest) {
    return res.status(404).json({ message: "Restaurant not found!" });
  }
  res.json(rest);
});

router.post("/", auth, (req, res) => {
  const { name, description, location, average_rating } = req.body;
  if (!name || !description || !location || !average_rating) {
    return res.status(400).json({ message: "Missing required data" });
  }
  const saved = Restaurants.saveRestaurant(
    name,
    description,
    location,
    average_rating
  );
  const rest = Restaurants.getRestaurantById(saved.lastInsertRowid);
  res.json(rest);
});

router.put("/:id", auth, (req, res) => {
  const id = +req.params.id;
  let rest = Restaurants.getRestaurantById(id);
  if (!rest) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  const { name, description, location, average_rating } = req.body;
  if (!name || !description || !location || !average_rating) {
    return res.status(400).json({ message: "Missing required data" });
  }
  Restaurants.updateRestaurant(id, name, description, location, average_rating);
  rest = Restaurants.getRestaurantById(id);
  res.json(rest);
});

router.patch("/:id", auth, (req, res) => {
  const id = +req.params.id;
  let rest = Restaurants.getRestaurantById(id);
  if (!rest) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  const { name, description, location, average_rating } = req.body;
  Restaurants.updateRestaurant(
    id,
    name || rest.name,
    description || rest.description,
    location || rest.location,
    average_rating || rest.average_rating
  );
  rest = Restaurants.getRestaurantById(id);
  res.json(rest);
});

router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const rest = Restaurants.getRestaurantById(id);
  if (!rest) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  Restaurants.deleteRestaurant(id);
  res.sendStatus(204);
});

export default router;
