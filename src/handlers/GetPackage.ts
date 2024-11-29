import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { packageCollection } from "../database/ConnectDB";

export async function getPackage(req: Request, res: Response) :Promise<void> {
  try {
    if (!packageCollection) {
       res.status(500).send({ message: "Database not connected" });
       return;
    }
    const id = req.params.id;
    const packageById = await packageCollection.findOne({_id: new ObjectId(id)});

    res.status(201).send({
      package: packageById
    });
    return;
  } catch (error) {
    console.error("Error getting package:", error);
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }
}

