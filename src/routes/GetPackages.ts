import express, { Router } from "express";
import { getPackages } from "../handlers/GetPackages";
import { getPackage } from "../handlers/GetPackage";
// import { verifyToken } from './../middlewares/TokenVerify';

const router: Router = express.Router();

// have to add user verify to add the package
// /get-packages api
router.get("/",getPackages);

// /get-packages/:id
router.get("/:id", getPackage);

export default router;