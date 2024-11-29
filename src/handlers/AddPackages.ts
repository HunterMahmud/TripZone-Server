import { Request, Response } from "express";
import { packagesCollection } from "../database/ConnectDB";

export async function AddPackage(req: Request, res: Response) :Promise<void> {
  try {
    if (!packagesCollection) {
       res.status(500).send({ message: "Database not connected" });
       return;
    }

    const packageInfo = req.body;

    const result = await packagesCollection.insertOne(packageInfo);

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

