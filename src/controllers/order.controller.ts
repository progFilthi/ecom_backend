import { NextFunction, Request, Response } from "express";

const OrderController = {
  getOrders: async (req: Request, res: Response, next:NextFunction) => {
    try {
      res.send("This is the GET Orders Route");
    } catch (error) {
      console.error(error);
    }
  },
  getOrderById: async (req: Request, res: Response) => {
    try {
      res.send("This is the GET Orders by id Route");
    } catch (error) {
      console.error(error);
    }
  },
  createOrder: async (req: Request, res: Response) => {
    try {
      res.send("This is the CREATE Order Route");
    } catch (error) {
      console.error(error);
    }
  },
  updateOrder: async (req: Request, res: Response) => {
    try {
      res.send("This is the UPDATE Order Route");
    } catch (error) {
      console.error(error);
    }
  },
  deleteOrder: async (req: Request, res: Response) => {
    try {
      res.send("This is the DELETE Order Route");
    } catch (error) {
      console.error(error);
    }
  },
  deleteAllOrders: async (req: Request, res: Response) => {
    try {
      res.send("This is the DELETE Orders Route");
    } catch (error) {
      console.error(error);
    }
  },
};

export default OrderController;
