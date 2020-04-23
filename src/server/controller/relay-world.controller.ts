import * as express from 'express';
import { getRelayWorldFeed } from '../service/zwift.service';
import { RelayWorld } from '../model/relay-world.interface';
import { RelayWorld as RelayWorldModel } from '../model/relay-world';
import { findUserSelf, findUser, getUserCyclingStats } from "../service/zwift.service";

import * as moment from 'moment';

export const relayworldController = express.Router();

// Get events on the day
relayworldController.put("/world/feed", async (req: express.Request, res: express.Response) => {
    try {
        const token: string = req.body.token;
        const relayWorldData: RelayWorld = await getRelayWorldFeed(token);
        await RelayWorldModel.create(relayWorldData);

        res.status(200).send(relayWorldData);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

relayworldController.get("/saved/feed", async (req: express.Request, res: express.Response) => {
    try {
        const savedData = await RelayWorldModel.findOne().sort("-currentDateTime");
        const jsonData = savedData.toJSON();
        res.status(200).send({
            isoBeginDateTime: "2020-04-18T00:00:00.000Z",
            isoCurrentDateTime: moment(jsonData.currentDateTime, 'X').toISOString(), 
            ...jsonData
        });
    } catch(e) {
        res.status(404).send(e.message);
    }
});

// relayworldController.get("/agreggated/feed", async (req: express.Request, res: express.Response) => {

//     try {

//     } catch(e) {
        
//     }
// });


/** get temp on the day data */
relayworldController.get("/agreggated/feed", async (req: express.Request, res: express.Response) => {

    try {
        const savedData = await RelayWorldModel.findOne().sort("-currentDateTime");
        const jsonData = savedData.toJSON();
        const isoBeginDateTime = "2020-04-18T00:00:00.000Z";
        const isoCurrentDateTime = moment(jsonData.currentDateTime, 'X').toISOString();
        let friendsInWorld = jsonData.friendsInWorld;
        const friendsArr = Object.keys(friendsInWorld);
        const token = req.session.zwift_access_token;

        let extraData = await Promise.all(
            friendsArr.map(async (userId:string) => {
                const aggregatedStats = await getUserCyclingStats(token, Number(userId), isoBeginDateTime, isoCurrentDateTime);
                const { totalDistanceInMeters, rideDurationInSeconds } = friendsInWorld[userId].toJSON();
                friendsInWorld[userId] = {
                    aggDistanceInMeters: Number(aggregatedStats.distanceRiddenInMeters) + Number(totalDistanceInMeters),
                    aggTimeInMinutes: Math.round(Number(aggregatedStats.timeRiddenInMinutes) + (Number(rideDurationInSeconds)/60)),
                    aggregatedStats, 
                    ...jsonData.friendsInWorld[userId].toJSON()
                };

                return friendsInWorld[userId];
            })
        );
        
        res.status(200).send({ ...jsonData, friendsInWorld });
    } catch (e) {
        res.status(404).send(e.message);
    }


})

