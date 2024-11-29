import { Request, Response } from "express";
import { usersCollection } from "../database/ConnectDB";

export async function createUser(req: Request, res: Response) :Promise<void> {
  try {
    if (!usersCollection) {
       res.status(500).send({ message: "Database not connected" });
       return;
    }

    const userInfo = req.body;

    // Check if the required fields are present
    if (!userInfo.email) {
       res.status(400).send({ message: "Email is required" });
      return;
    }

    const query = { email: userInfo.email };
    const isExists = await usersCollection.findOne(query);

    if (isExists) {
       res.send({ message: "User already exists", insertedId: null });
       return;
    }

    // Assign default role
    userInfo.role = "user";

    const result = await usersCollection.insertOne(userInfo);

    res.status(201).send({
      message: "User created successfully",
      insertedId: result.insertedId,
    });
    return;
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }
}

