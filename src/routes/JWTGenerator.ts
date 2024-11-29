import { Router } from "express";
import { JWTGenerator } from "../handlers/JWTGEnerator";



const router = Router();

// /jwt
router.post('/', JWTGenerator);


export default router;