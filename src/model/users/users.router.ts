/** Required External Modules and Interfaces */

import express, { Request, Response } from "express";
import * as UserService from "./users.service";
import { User } from "./user.interface";
import { Users } from "./users.interface";

/** Router Definition */
export const usersRouter = express.Router();

/** Controller Definitions */

// GET items/
usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users: Users = await UserService.findAll();
        res.status(200).send(users);
    } catch(e) {
        res.status(404).send(e.message);
    }
})

// GET items/:id

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const user: User = await UserService.find(id);
        res.status(200).send(user);
    } catch(e) {
        res.status(404).send(e.message);
    }
})

// POST items/

// PUT items/

// DELETE items/:id