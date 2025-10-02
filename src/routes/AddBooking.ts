import express, { Router } from "express";
import { AddBooking } from "../handlers/AddBooking";

const router: Router = express.Router();

// have to add token verify to add the booking
// add-booking
router.post("/", AddBooking);

export default router;