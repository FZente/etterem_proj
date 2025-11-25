import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT,
    role TEXT DEFAULT 'user'
    )`
).run();

export const getAllUsers = () => {
  return db.prepare("SELECT * FROM users").all();
};
export const setAdmin = (id) => {
  db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(id);
}
export const getUserById = (id) =>
  db.prepare("SELECT * FROM users WHERE id = ?").get(id);
export const getUserByEmail = (email) =>
  db.prepare("SELECT * FROM users WHERE email = ?").get(email);
export const saveUser = (name, email, password) =>
  db
    .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
    .run(name, email, password);
export const updateUser = (id, name, email, password) =>
  db
    .prepare("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?")
    .run(name, email, password, id);
export const deleteUser = (id) =>
  db.prepare("DELETE FROM users WHERE id = ?").run(id);

const count = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
