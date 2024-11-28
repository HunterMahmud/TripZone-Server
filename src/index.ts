import express, { Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import abc from "./routes/users";
import jwtGenerator from './routes/JWTGenerator';
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      // other links will be here
    ],
    credentials: true,
  })
);

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongdb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use('/jwt',jwtGenerator)
app.use("/api/users", abc);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client.db("TripDB").collection("users");

    // Your other MongoDB-related code
  } finally {
    // Close resources if needed
  }
}

run().catch(console.dir);

app.get("/", (req: Request, res: Response) => {
  res.send("TripZone server is running...");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
