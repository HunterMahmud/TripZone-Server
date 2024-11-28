// there will be all the handler functions specifications
import { Request, Response } from 'express';
export async function getUsers(req:Request, res:Response) {
    res.send([]);
}

export async function getUserById(req: Request, res: Response) {
 res.send({})    
}