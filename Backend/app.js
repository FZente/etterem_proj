import express from "express";
import restaurantsRoutes from "./routes/restaurantsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

const PORT = 4040;
const app = express();

app.use(express.json());

app.use("/restaurants", restaurantsRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on port http://localhost:${PORT}`);
});
