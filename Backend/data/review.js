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
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
    )`
).run();

export const getAllReviews = () => db.prepare("SELECT * FROM reviews").all();
export const getReviewsById = (id) =>
  db.prepare("SELECT * FROM reviews").get(id);
export const saveReview = (rating, comment) =>
  db
    .prepare("INSERT INTO reviews (rating, comment) VALUES (?,?)")
    .run(rating, comment);
export const updateReview = (id, rating, comment) =>
  db
    .prepare("UPDATE reviews SET rating = ?, comment = ? WHERE id = ?")
    .run(rating, comment, id);
export const deleteReview = (id) =>
  db.prepare("DELETE FROM reviews WHERE id = ?").run(id);
