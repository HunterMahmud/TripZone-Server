import { Request, Response } from "express";
import { packageCollection } from "../database/ConnectDB";

export async function getPackages(req: Request, res: Response) :Promise<void> {
  try {
    if (!packageCollection) {
       res.status(500).send({ message: "Database not connected" });
       return;
    }

    const packages = await packageCollection.find({}).toArray();

    res.status(201).send({
      packages: packages
    });
    return;
  } catch (error) {
    console.error("Error getting packages:", error);
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }
}

