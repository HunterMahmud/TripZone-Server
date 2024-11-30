import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, Collection } from "mongodb";

dotenv.config();

// const uri = `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb://localhost:27017`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export let usersCollection: Collection | undefined;
export let packagesCollection: Collection | undefined;
export let bookingsCollection: Collection | undefined;

export async function connectToDatabase() {
  try {
    await client.connect();
    usersCollection = client.db("TripDB").collection("users");
    packagesCollection = client.db("TripDB").collection("packages");
    bookingsCollection = client.db("TripDB").collection("bookings");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("MongoDB connection failed");
  }
}
