import * as express from 'express';
import { findEventsByTimeRange } from '../service/zwift.service';
import { Event, Events } from '../model/event.interface';
export const eventsController = express.Router();

// Get events on the day
eventsController.get("/", async (req: express.Request, res: express.Response) => {
    try {
        const token: string = req.body.token;
        const { startTimeStamp, endTimeStamp } = req.query;
        const events: Events = await findEventsByTimeRange(
            token, 
            Number(startTimeStamp), 
            Number(endTimeStamp)
        );
        res.status(200).send(events);
    } catch(e) {
        res.status(404).send(e.message);
    }
});
