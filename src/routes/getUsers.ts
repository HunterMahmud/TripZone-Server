import express, { Router } from "express";
import { getUser } from "../handlers/GetUser";
import { getPackage } from "../handlers/GetPackage";
// import { verifyToken } from './../middlewares/TokenVerify';

const router: Router = express.Router();

// have to add user verify to get the package
// /get-users api
// router.get("/",getUsers);

// /get-user/:email
router.get("/:email", getUser);

export default router;