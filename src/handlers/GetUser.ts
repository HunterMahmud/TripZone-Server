import { Request, Response } from "express";
import { usersCollection } from "../database/ConnectDB";

export async function getUser(req: Request, res: Response) :Promise<void> {
  try {
    if (!usersCollection) {
       res.status(500).send({ message: "Database not connected" });
       return;
    }
    const email = req.params.email;
    const result = await usersCollection.findOne({ email });

    res.send(result);
    
    return;
  } catch (error) {
    console.error("Error getting User:", error);
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }
}

