import express, { Request, Response } from 'express';

export const eventsRouter = express.Router();

eventsRouter.get("/", async (req: Request, res: Response) => {

    try {
        res.status(200).send({hello: 'world'});
    } catch(e) {
        res.status(404).send(e.message);
    }
});