import { Router } from "express";
import productController from "../controllers/product.controller";
import { protectedRoute, adminRoute } from "../middleware/auth.route";

const productRouter = Router();

productRouter.get(
  "/",
  // protectedRoute,
  // adminRoute,
  productController.getAllProducts
);
productRouter.post(
  "/",
  protectedRoute,
  adminRoute,
  productController.createProduct
);

export default productRouter;
