import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import jwtGenerator from './routes/JWTGenerator';
import addPackage from './routes/AddPackages'
import getPackage from './routes/GetPackages'
import { connectToDatabase } from "./database/ConnectDB";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://trip-zone-server.vercel.app"
      // other links will be here
    ],
    credentials: true,
  })
);

app.use(express.json());



async function startServer() {
  try {
    await connectToDatabase(); // Connect to MongoDB
    app.use("/jwt",jwtGenerator) // post and get jwt
    app.use("/user", userRoutes); // post User data
    app.use("/add-package", addPackage); // psot add-package
    app.use("/get-packages", getPackage); // get get-packages

    app.get('/', (req: Request, res: Response)=>{
      res.send('TripZone server is running...');
    })
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit process on failure
  }
}

startServer();


