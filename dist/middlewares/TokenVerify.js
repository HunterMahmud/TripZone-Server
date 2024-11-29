"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Verify JWT middleware
const verifyToken = (req, res, next) => {
    var _a;
    const authorization = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authorization) {
        return res.status(401).send({ message: "Not authorized" });
    }
    const token = authorization.split(" ")[1];
    if (!process.env.SECRET) {
        return res.status(500).send({ error: "JWT secret is not defined" });
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.decoded = decoded; // Attach decoded token to req object
        next();
    });
};
exports.verifyToken = verifyToken;
