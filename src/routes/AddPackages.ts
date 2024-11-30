import express, { Router } from "express";
import { AddPackage } from "../handlers/AddPackages";
// import { verifyAdmin } from './../middlewares/AdminVerify';

const router: Router = express.Router();

// have to add admin verify to add the package
// add-package
router.post("/" ,AddPackage);

export default router;