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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const JWTGenerator_1 = __importDefault(require("./routes/JWTGenerator"));
const ConnectDB_1 = require("./database/ConnectDB");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        // other links will be here
    ],
    credentials: true,
}));
app.use(express_1.default.json());
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, ConnectDB_1.connectToDatabase)(); // Connect to MongoDB
            app.use('/jwt', JWTGenerator_1.default);
            app.use("/user", users_1.default); // Use user routes
            app.get('/', (req, res) => {
                res.send('TripZone server is running...');
            });
            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        }
        catch (error) {
            console.error("Failed to start the server:", error);
            process.exit(1); // Exit process on failure
        }
    });
}
startServer();
