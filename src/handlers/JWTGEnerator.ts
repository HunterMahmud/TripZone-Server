import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function JWTGenerator(req: Request, res: Response): Promise<void> {
  const user = req.body;

  // Ensure SECRET is defined
  if (!process.env.SECRET) {
    res.status(500).send({ error: "JWT secret is not defined" });
    return; // Stop execution
  }

  try {
    const token = jwt.sign(user, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(500).send({ error: "Failed to generate JWT" });
  }
}
