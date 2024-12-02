import { Request, Response } from "express";
import { usersCollection } from "../database/ConnectDB";

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    if (!usersCollection) {
      res.status(500).send({ message: "Database not connected" });
      return;
    }

    // // Query parameters
    // const size: number = parseInt(req.query.size as string, 10);
    // const page: number = parseInt(req.query.page as string, 10) - 1;
    // const filter: string | undefined = req.query.filter as string;
    // const search: string | undefined = req.query.search as string;

    // // Defining query interface
    // interface Query {
    //   name?: {
    //     $regex: string;
    //     $options: string;
    //   };
    //   role?: string;
    // }

    // // Defining options interface
    // interface Options {
    //   [key: string]: any; // Allows additional dynamic properties if needed
    // }

    // // Initial query object
    // let query: Query = {};

    // // Add search condition if provided
    // if (search) {
    //   query.name = { $regex: search, $options: "i" };
    // }

    // // Add filter condition if provided
    // if (filter) {
    //   query.role = filter;
    // }

    // // MongoDB query options (optional for projections/sorting)
    // let options: Options = {};

    // // Fetching users from the collection with pagination
    // const result = await usersCollection
    //   .find(query, options)
    //   .skip(page * size)
    //   .limit(size)
    //   .toArray();

    // // Sending the result as response
    // res.send(result); 

    const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    return;
  } catch (error) {
    console.error("Error getting User:", error);
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }
}
