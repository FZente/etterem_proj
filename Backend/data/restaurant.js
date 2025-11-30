import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS restaurants(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    location TEXT
    )`
).run();

export const getAllRestaurants = () =>
  db.prepare(`
    SELECT 
      r.*,
      IFNULL((
        SELECT AVG(rating)
        FROM reviews
        WHERE restaurant_id = r.id
      ), 0) AS average_rating
    FROM restaurants r
  `).all();

export const getRestaurantById = (id) =>
  db.prepare(`
    SELECT 
      r.*,
      IFNULL((
        SELECT AVG(rating)
        FROM reviews
        WHERE restaurant_id = r.id
      ), 0) AS average_rating
    FROM restaurants r
    WHERE r.id = ?
  `).get(id);

export const getRestaurantByName = (name) =>
  db.prepare("SELECT * FROM restaurants WHERE name = ?").get(name);

export const getRestaurantByLocation = (location) =>
  db.prepare("SELECT * FROM restaurants WHERE location = ?").get(location);

export const saveRestaurant = (name, description, location) =>
  db
    .prepare(
      "INSERT INTO restaurants (name, description, location) VALUES (?, ?, ?)"
    )
    .run(name, description, location);

export const updateRestaurant = (
  id,
  name,
  description,
  location
) =>
  db
    .prepare(
      "UPDATE restaurants SET name = ?, description = ?, location = ? WHERE id = ?"
    )
    .run(name, description, location, id);

export const deleteRestaurant = (id) =>
  db.prepare("DELETE FROM restaurants WHERE id = ?").run(id);

const count = db
  .prepare("SELECT COUNT(*) AS count FROM restaurants")
  .get().count;

if (count === 0) {

  const insert = db.prepare(`
    INSERT INTO restaurants (name, description, location)
    VALUES (?, ?, ?)
  `);

  const defaultRestaurants = [
    ["La Bella Vita", "Olasz étterem kézműves pizzákkal", "Budapest"],
    ["Sushi World", "Friss sushi és ázsiai ízek", "Debrecen"],
    ["Steak House", "Prémium marhahús és borválogatás", "Szeged"],
    ["Veggie Garden", "Vegán ételek természetesen", "Pécs"],
  ];

  const insertMany = db.transaction((restaurants) => {
    for (const r of restaurants) insert.run(...r);
  });

  insertMany(defaultRestaurants);
}