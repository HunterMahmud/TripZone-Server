import { Request, Response } from "express";
import { bookingsCollection } from "../database/ConnectDB";

export async function AddBooking(req: Request, res: Response) :Promise<void> {
  try {
    if (!bookingsCollection) {
       res.status(500).send({ message: "Database not connected" });
       return;
    }

    const bookingInfo = req.body;

    const result = await bookingsCollection.insertOne(bookingInfo);

    res.status(201).send({
      message: "Book added successfull",
      insertedId: result.insertedId,
    });
    return;
  } catch (error) {
    console.error("Error in booking:", error);
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }
}

