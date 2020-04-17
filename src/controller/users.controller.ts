/** Required External Modules and Interfaces */
import express, { Request, Response } from "express";
import { findUserSelf, findUser, getUserCyclingStats } from "../service/zwift.service";
import { User, Users } from "../model/user.interface";

/** Router Definition */
export const usersController = express.Router();

/** Controller Definitions */
// get self
usersController.get("/me", async (req: Request, res: Response) => {
    try {
        const token: string = req.body.token;
        const user: User = await findUserSelf(token);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

// get user by id
usersController.get("/:id", async (req: Request, res: Response) => {
    try {
        const token: string = req.body.token;
        const userId: string = req.params.id;
        const user: User = await findUser(token, userId);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

// get user stats by id
usersController.get("/:id/stats", async (req: Request, res: Response) => {
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
usersController.get("/:id/followers", async (req: Request, res: Response) => {

});

// Get users/followees
usersController.get("/:id/followees", async (req: Request, res: Response) => {

});

