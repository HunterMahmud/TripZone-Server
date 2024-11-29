import { Request, Response } from "express";
import { packageCollection } from "../database/ConnectDB";

export async function AddPackage(req: Request, res: Response) :Promise<void> {
  try {
    if (!packageCollection) {
       res.status(500).send({ message: "Database not connected" });
       return;
    }

    const packageInfo = req.body;

    const result = await packageCollection.insertOne(packageInfo);

    res.status(201).send({
      message: "Package added successfully",
      insertedId: result.insertedId,
    });
    return;
  } catch (error) {
    console.error("Error in adding package:", error);
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }
}

