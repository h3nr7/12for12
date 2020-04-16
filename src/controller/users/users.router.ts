/** Required External Modules and Interfaces */

import express, { Request, Response } from "express";
import * as UserService from "./users.service";
import { User } from "./user.interface";
import { Users } from "./users.interface";
import { ZwiftAuthResponse } from "./auth-response.interface";
import { request } from "http";

/** Router Definition */
export const usersRouter = express.Router();

/** Controller Definitions */

// GET users/
usersRouter.post("/auth/login", async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email;
        const password: string = req.body.password
        const auth: ZwiftAuthResponse = await UserService.emailLogin(email, password);
        res.status(200).send(auth);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

usersRouter.post("/auth/token", async (req: Request, res: Response) => {
    try {
        const token: string = req.body.token;
        const auth: ZwiftAuthResponse = await UserService.refreshTokenLogin(token);
        res.status(200).send(auth);
    } catch(e) {
        res.status(404).send(e.message);
    }
});


usersRouter.get("/me", async (req: Request, res: Response) => {
    try {
        const token: string = req.body.token;
        const user: User = await UserService.findSelf(token);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const token: string = req.body.token;
        const userId: string = req.params.id;
        const user: User = await UserService.find(token, userId);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

// GET users/followers
usersRouter.get("/:id/followers", async (req: Request, res: Response) => {

});

// Get users/followees
usersRouter.get("/:id/followees", async (req: Request, res: Response) => {

});

