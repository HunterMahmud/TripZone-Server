import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, Collection } from "mongodb";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export let userCollection: Collection | undefined;

export async function connectToDatabase() {
  try {
    await client.connect();
    userCollection = client.db("TripDB").collection("users");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("MongoDB connection failed");
  }
}
