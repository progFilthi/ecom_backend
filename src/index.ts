import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

dotenv.config();

const app = express();

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL as string,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//ROUTE HANDLER picks all routes starting with /api/auth/...
app.all("/api/auth/*splat", toNodeHandler(auth));

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
