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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const ConnectDB_1 = require("../database/ConnectDB");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!ConnectDB_1.userCollection) {
                res.status(500).send({ message: "Database not connected" });
                return;
            }
            const userInfo = req.body;
            // Check if the required fields are present
            if (!userInfo.email) {
                res.status(400).send({ message: "Email is required" });
                return;
            }
            const query = { email: userInfo.email };
            const isExists = yield ConnectDB_1.userCollection.findOne(query);
            if (isExists) {
                res.send({ message: "User already exists", insertedId: null });
                return;
            }
            // Assign default role
            userInfo.role = "user";
            const result = yield ConnectDB_1.userCollection.insertOne(userInfo);
            res.status(201).send({
                message: "User created successfully",
                insertedId: result.insertedId,
            });
            return;
        }
        catch (error) {
            console.error("Error in createUser:", error);
            res.status(500).send({ message: "Internal Server Error" });
            return;
        }
    });
}
