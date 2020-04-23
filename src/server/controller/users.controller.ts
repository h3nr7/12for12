/** Required External Modules and Interfaces */
import * as express from "express";
import { findUserSelf, findUser, getUserCyclingStats } from "../service/zwift.service";
import { User, Users } from "../model/user.interface";
import { stat } from "fs";

/** Router Definition */
export const usersController = express.Router();

/** Controller Definitions */
// get self
usersController.get("/me", async (req: express.Request, res: express.Response) => {
    try {
        const token: string = req.body.token;
        const user: User = await findUserSelf(token);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

// get user by id
usersController.get("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const token: string = req.body.token;
        const userId: string = req.params.id;
        const user: User = await findUser(token, userId);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

// Get a list of user stats
usersController.put("/list/stats", async (req: express.Request, res: express.Response) => {
    try {
        const token: string = req.body.token;
        const userIds:[] = req.body.userIds;
        const startDateTime:string = encodeURI(String(req.query.startDateTime));
        const endDateTime:string = encodeURI(String(req.query.endDateTime));
        const usersStats = await Promise.all(userIds.map(async (userId: number & string) => {
            const user: User = await findUser(token, userId);
            const { 
                id, firstName, lastName, male, imageSrc, 
                playerTypeId, ftp, totalDistance, totalDistanceClimbed, totalTimeInMinutes } = user;
            let uStats = await getUserCyclingStats(token, userId, startDateTime, endDateTime);
            return {
                id, firstName, lastName, male, imageSrc, 
                playerTypeId, ftp, totalDistance, totalDistanceClimbed, totalTimeInMinutes,
                aggregatedStats: {startDateTime, endDateTime, ...uStats}
            };
        }));
        res.status(200).send(usersStats);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

// get user stats by id
usersController.put("/:id/stats", async (req: express.Request, res: express.Response) => {
    try {
        const token:string = req.body.token;
        const userId:number = Number(req.params.id);
        const startDateTime:string = encodeURI(String(req.query.startDateTime));
        const endDateTime:string = encodeURI(String(req.query.endDateTime));
        const stats: any = await getUserCyclingStats(token, userId, startDateTime, endDateTime);
        res.status(200).send(stats);
    } catch(e) {
        res.status(400).send(e.message);
    }
});


// GET users/followers
usersController.get("/:id/followers", async (req: express.Request, res: express.Response) => {

});

// Get users/followees
usersController.get("/:id/followees", async (req: express.Request, res: express.Response) => {

});

