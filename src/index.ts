import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//health check
app.get("/", (_, res) => {
  res.status(200).json({ message: "The app is running" });
});



import orderRoutes from "../src/routes/order.route";

app.use("api/v1/", orderRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The app is listening on http://localhost:${port}`);
});
