import express, { NextFunction, Request, Response } from 'express';

const app = express();

const PORT = 3000;


app.get('/api/user', (req:Request, res:Response, next:NextFunction) => {
    res.send([]);
});



app.listen(PORT, () => {
    console.log(`Running on post ${PORT}`);    
});



