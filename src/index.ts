import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import jwtGenerator from './routes/JWTGenerator';
import { connectToDatabase } from "./database/ConnectDB";

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



async function startServer() {
  try {
    await connectToDatabase(); // Connect to MongoDB
    app.use('/jwt',jwtGenerator)
    app.use("/user", userRoutes); // Use user routes


    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit process on failure
  }
}

startServer();


