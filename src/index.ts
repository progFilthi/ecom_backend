import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//health check
app.get("/", (_, res) => {
  res.status(200).send("The app is running");
});

import orderRoutes from "../src/routes/order.route";
import productRoutes from "../src/routes/product.route";

app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/products", productRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The app is listening on http://localhost:${port}`);
});
