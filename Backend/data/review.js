import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS reviews(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    restaurant_id INTEGER,
    rating NUMBER,
    comment TEXT,
    created_at DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
    )`
).run();

export const getAllReviews = () => db.prepare("SELECT * FROM reviews").all();
export const getReviewsById = (id) =>
  db.prepare("SELECT * FROM reviews WHERE id = ?").get(id);
export const getReviewsByRestaurantId = (restaurant_id) =>
  db.prepare("SELECT * FROM reviews WHERE restaurant_id = ?").all(restaurant_id);
export const saveReview = (rating, comment) =>
  db
    .prepare("INSERT INTO reviews (rating, comment, created_at) VALUES (?,?,?)")
    .run(rating, comment, new Date().toISOString());
export const updateReview = (id, rating, comment) =>
  db
    .prepare("UPDATE reviews SET rating = ?, comment = ? WHERE id = ?")
    .run(rating, comment, id);
export const deleteReview = (id) =>
  db.prepare("DELETE FROM reviews WHERE id = ?").run(id);

const count = db.prepare("SELECT COUNT(*) AS count FROM reviews").get().count;

if (count === 0) {
  const insert = db.prepare(`
    INSERT INTO reviews (user_id, restaurant_id, rating, comment, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  const defaultReviews = [
    [1, 1, 3, "Elment", new Date().toISOString()],
    [1, 4, 4, "Jó volt!", new Date().toISOString()],
    [2, 2, 1, "Szar volt volt!", new Date().toISOString()],
    [3, 2, 5, "Szuper volt! Visszatérek biztosan!", new Date().toISOString()],
  ];

  const insertMany = db.transaction((reviews) => {
    for (const r of reviews) insert.run(...r);
  });

  insertMany(defaultReviews);
}
