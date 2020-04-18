import * as express from 'express';
import { getRelayWorldFeed } from '../service/zwift.service';
import { RelayWorld } from '../model/relay-world.interface';
export const relayworldController = express.Router();

import { RelayWorld as RelayWorldModel } from '../model/relay-world';


// Get events on the day
relayworldController.get("/world/feed", async (req: express.Request, res: express.Response) => {
    try {
        const token: string = req.body.token;
        const relayWorldData: RelayWorld = await getRelayWorldFeed(token);
        await RelayWorldModel.create(relayWorldData);

        res.status(200).send(relayWorldData);
    } catch(e) {
        res.status(404).send(e.message);
    }
});
