import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import z from "../../node_modules/zod/index.cjs";

const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string(),
  imageUrl: z.string(),
  category: z.array(z.string()).nonempty(),
  sellerId: z.string(),
});

const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const parsed = productSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid input",
          errors: parsed.error,
        });
      }

      const { name, price, description, imageUrl, category, sellerId } =
        parsed.data;

      const product = await prisma.product.create({
        data: {
          name,
          price,
          imageUrl,
          description,
          category,
          sellerId,
        },
      });

      res.status(200).json({
        success: true,
        message: "Product created successfully!",
        product,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error while creating product" });
    }
  },
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await prisma.product.findMany({});
      if (!products)
        return res
          .status(404)
          .json({ success: false, message: "Products Not Found" });
      res.status(200).json({ mesage: "All products ", products });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error while getting all products" });
    }
  },
};

export default productController;
