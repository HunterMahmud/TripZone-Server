import express, { Router } from "express";
import { createUser } from "../handlers/users";

const router: Router = express.Router();

router.post("/", createUser);

export default router;


