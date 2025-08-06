import { Router } from "express";
import productController from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:productId", productController.getProductById);
productRouter.post("/", productController.createProduct);
productRouter.put("/:productId", productController.updateProduct);
productRouter.delete("/productId", productController.deleteProduct);
productRouter.delete("/", productController.deleteAllProducts);

export default productRouter;
