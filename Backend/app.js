import express from "express";
import restaurantsRoutes from "./routes/restaurantsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import cors from "cors";

const PORT = 4040;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/restaurants", restaurantsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/reviews", reviewsRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on port http://localhost:${PORT}`);
});
