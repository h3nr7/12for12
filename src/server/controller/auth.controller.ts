/** Required External Modules and Interfaces */

import express, { Request, Response } from "express";
import { emailLogin, refreshTokenLogin } from "../service/zwift.service";
import { ZwiftAuthResponse } from "../service/zwift.interface";

/** Router Definition */
export const authController = express.Router();

/** Controller Definitions */

// auth users/
authController.post("/login", async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email;
        const password: string = req.body.password
        const auth: ZwiftAuthResponse = await emailLogin(email, password);
        res.status(200).send(auth);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

authController.post("/token", async (req: Request, res: Response) => {
    try {
        const token: string = req.body.token;
        const auth: ZwiftAuthResponse = await refreshTokenLogin(token);
        res.status(200).send(auth);
    } catch(e) {
        res.status(404).send(e.message);
    }
});
