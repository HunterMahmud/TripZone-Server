import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, Collection } from "mongodb";

dotenv.config();

// Extend Request type to include 'decoded'
declare module "express-serve-static-core" {
  interface Request {
    decoded?: string | JwtPayload; // Define the type of 'decoded'
  }
}

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let userCollection: Collection;

// Initialize MongoDB connection
async function connectToDatabase() {
  try {
    await client.connect();
    userCollection = client.db("TripDB").collection("users");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

connectToDatabase();

// Verify Admin Middleware
export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if 'decoded' exists and has the email property
    if (!req.decoded || typeof req.decoded === "string") {
      return res.status(401).send({ message: "Unauthorized: Invalid token" });
    }

    const email = req.decoded.email; // Ensure decoded contains 'email'
    if (!email) {
      return res.status(400).send({ message: "Email not found in token" });
    }

    // Find user in the database
    const user = await userCollection.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(403).send({ message: "Forbidden: Admin access only" });
    }

    next(); // User is admin, proceed to the next middleware
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
