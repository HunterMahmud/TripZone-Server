import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Request type to include 'decoded'
declare module "express-serve-static-core" {
  interface Request {
    decoded?: string | JwtPayload; // Define the type of 'decoded'
  }
}

// Verify JWT middleware
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    return res.status(401).send({ message: "Not authorized" });
  }

  const token = authorization.split(" ")[1];

  if (!process.env.SECRET) {
    return res.status(500).send({ error: "JWT secret is not defined" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    req.decoded = decoded; // Attach decoded token to req object
    next();
  });
};
