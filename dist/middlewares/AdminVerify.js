"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
let userCollection;
// Initialize MongoDB connection
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            userCollection = client.db("TripDB").collection("users");
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("Failed to connect to MongoDB", error);
        }
    });
}
connectToDatabase();
// Verify Admin Middleware
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield userCollection.findOne({ email });
        if (!user || user.role !== "admin") {
            return res.status(403).send({ message: "Forbidden: Admin access only" });
        }
        next(); // User is admin, proceed to the next middleware
    }
    catch (error) {
        console.error("Error in verifyAdmin middleware:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.verifyAdmin = verifyAdmin;
