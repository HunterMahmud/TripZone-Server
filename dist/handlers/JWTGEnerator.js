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
exports.JWTGenerator = JWTGenerator;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function JWTGenerator(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        // Ensure SECRET is defined
        if (!process.env.SECRET) {
            res.status(500).send({ error: "JWT secret is not defined" });
            return; // Stop execution
        }
        try {
            const token = jsonwebtoken_1.default.sign(user, process.env.SECRET, {
                expiresIn: "1h",
            });
            res.send({ token });
        }
        catch (error) {
            console.error("JWT Error:", error);
            res.status(500).send({ error: "Failed to generate JWT" });
        }
    });
}
