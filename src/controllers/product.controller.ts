import type { Request, Response } from "express";
import prisma from "../lib/prisma";

const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const { name, price, description, imageUrl, category, userId } = req.body;
      if (
        !name ||
        !price ||
        !description ||
        !imageUrl ||
        !category ||
        !userId
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All the fields are required!" });
      }
      const products = await prisma.product.create({
        data: {
          name,
          price,
          description,
          imageUrl,
          category,
          userId,
        },
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully!",
        products: products,
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
      res.status(200).json({ message: "All products ", products });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error while getting all products" });
    }
  },
  getProductById: async (req: Request, res: Response) => {
    try {
      const { productId } = req.body;
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product Not Found",
          product: product,
        });
      res
        .status(200)
        .json({ message: "Fetched a product successfully", product: product });
    } catch (error) {
      console.error("Internal server error while getting a product", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while getting a product",
      });
    }
  },
  updateProduct: async (req: Request, res: Response) => {
    try {
      const { name, price, description, imageUrl, category } = req.body;
      const { productId } = req.body;
      const products = await prisma.product.update({
        where: { id: productId },
        data: {
          name: name,
          price: price,
          description: description,
          imageUrl: imageUrl,
          category: category,
        },
      });
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        products: products,
      });
    } catch (error) {
      console.error("Internal server error while updating a product", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while updating a product",
      });
    }
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { productId } = req.body;
      const products = await prisma.product.delete({
        where: { id: productId },
      });
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        products: products,
      });
    } catch (error) {
      console.error("Internal server error while deleting a product", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while deleting a product",
      });
    }
  },
  deleteAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await prisma.product.deleteMany({});
      res.status(200).json({
        success: true,
        message: "All Products deleted successfully",
        products: products,
      });
    } catch (error) {
      console.error("Internal server error while deleting a product", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while deleting a product",
      });
    }
  },
};

export default productController;
