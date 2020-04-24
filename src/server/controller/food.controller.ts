import * as express from 'express';
import { Food } from '../model/food';
import {Food as IFood } from '../model/food.interface';
export const foodController = express.Router();


foodController.post('/', async (req:express.Request, res:express.Response) => {
    try {
        const update = req.body;
        let condition: any = {};
        if(update.name) condition = {name: update.name};
        const result = await Food.findOneAndUpdate(condition, update, { upsert: true });
        res.status(200).send(result);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

foodController.get('/all', async (req:express.Request, res: express.Response) => {
    try {
        const data = await Food.find().lean();
        res.status(200).send(data);
    } catch(e) {
        res.status(404).send(e.message);
    }
})