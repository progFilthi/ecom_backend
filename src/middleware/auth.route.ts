import type { Response, Request, NextFunction } from "express";
import prisma from "../lib/prisma";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.session || !session.user) {
      return res.status(401).json({ message: "User unauthorized" });
    }
    (req as any).session = session;
    next();
  } catch (error) {
    console.error("Internal error while protecting the route", error);
  }
};

export const adminRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = (req as any).session;
    if (!session || !session.user) {
      return res.status(401).json({ message: "User unauthorized" });
    }
    const userRoles = session.user.roles;
    if (userRoles === "admin") {
      return next();
    }
    return res.status(403).json({ message: "Forbidden route, Admins only" });
  } catch (error) {
    console.error(error);
  }
};
