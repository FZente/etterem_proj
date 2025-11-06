import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS restaurants(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    location TEXT,
    average_rating NUMBER
    )`
).run();

export const getAllRestaurants = () =>
  db.prepare("SELECT * FROM restaurants").all();

export const getRestaurantById = (id) =>
  db.prepare("SELECT * FROM restaurants WHERE id = ?").get(id);

export const getRestaurantByName = (name) =>
  db.prepare("SELECT * FROM restaurants WHERE name = ?").get(name);

export const saveRestaurant = (name, description, location, average_rating) =>
  db
    .prepare(
      "INSERT INTO restaurants (name, description, location, average_rating) VALUES (?, ?, ?, ?)"
    )
    .run(name, description, location, average_rating);

export const updateRestaurant = (
  id,
  name,
  description,
  location,
  average_rating
) =>
  db
    .prepare(
      "UPDATE restaurants SET name = ?, description = ?, location = ?, average_rating = ? WHERE id = ?"
    )
    .run(name, description, location, average_rating, id);

export const deleteRestaurant = (id) =>
  db.prepare("DELETE FROM restaurants WHERE id = ?").run(id);
