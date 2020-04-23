import * as express from 'express';
import { findEventsByTimeRange, getBulkEventDetails } from '../service/zwift.service';
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

// get a list of event details
eventsController.put("/list", async (req: express.Request, res: express.Response) => {
    try {
        const token: string = req.body.token;
        const { eventIds } = req.body;

        const events: Events = await getBulkEventDetails(
            token,
            eventIds
        );
        res.status(200).send(events);
    } catch (e) {
        res.status(404).send(e.message);
    }
});
