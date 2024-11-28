import { Router } from "express";
import { JWTGenerator } from "../handlers/JWTGEnerator";



const router = Router();

// /jwt
router.get('/', JWTGenerator);


export default router;