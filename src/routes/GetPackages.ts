import express, { Router } from "express";
import { getPackages } from "../handlers/GetPackages";
// import { verifyToken } from './../middlewares/TokenVerify';

const router: Router = express.Router();

// have to add user verify to add the package
router.get("/",getPackages);

export default router;