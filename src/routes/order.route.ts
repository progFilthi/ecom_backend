import express from "express";
import OrderController from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.get("/", OrderController.getOrders);
orderRouter.get("/:orderId", OrderController.getOrderById);
orderRouter.post("/", OrderController.createOrder);
orderRouter.put("/:orderId", OrderController.updateOrder);
orderRouter.delete("/:orderId", OrderController.deleteOrder);
orderRouter.delete("/", OrderController.deleteAllOrders);

export default orderRouter;
