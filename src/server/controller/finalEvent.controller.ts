import * as express from 'express';
import { FinalEventPlayer } from '../model/finalEventPlayer';
import  { Food } from '../model/food';
import { 
    FinalEventPlayer as IFinalEventPlayer
} from '../model/finalEventPlayer.interface';
import { Food as IFood } from '../model/food.interface';
export const finalEventController = express.Router();

finalEventController.post('/players/bulk', async (req: express.Request, res: express.Response) => {
    try {
        const playerData: [IFinalEventPlayer] = req.body.players;
        const result = await FinalEventPlayer.insertMany(playerData)
            .catch(e => {console.log(e); return Promise.reject(e);})
        res.status(200).send(result);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

finalEventController.post('/players', async (req: express.Request, res: express.Response) => {
    try {
        const playerData: IFinalEventPlayer = req.body;
        const { firstName, lastName } = req.body;
        const result = await FinalEventPlayer.findOneAndUpdate({
            firstName,
            lastName
        }, playerData, { upsert: true }).lean();

        res.status(200).send(result);
    } catch(e) {
        res.status(404).send(e.message);
    }
})

// get all players
finalEventController.get('/players', async (req: express.Request, res: express.Response) => {
    try {

        const { page, perPage, sort, select, agreedToShare  } = req.query;
        let collection: any = {};
        if(agreedToShare) collection.isAgreedToShare = agreedToShare === 'true' || false;

        const allPlayers = await FinalEventPlayer.paginate(collection,
        {
            select, sort,
            lean: true,
            page: Number(page), 
            perPage: Number(perPage)
        });
        res.status(200).send(allPlayers);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

/** get a single player */
finalEventController.get('/players/:id', async (req:express.Request, res:express.Response) => {
    try {
        const playerId: number = Number(req.params.id);
        const finalEventPlayer = await FinalEventPlayer.findOne({id: playerId}).lean()
            .then(results => ({...results}));
        res.status(200).send(finalEventPlayer);
    } catch(e) {
        res.status(404).send(e.message);
    }
});

finalEventController.get('/results/agg', async (req:express.Request, res: express.Response) => {
    try {
        const { agreedToShare } = req.query;
        let collected: any = {};
        if(agreedToShare) collected.isAgreedToShare = agreedToShare === 'true' || false;
        const allPlayers = await FinalEventPlayer.find(collected).lean();
        const allFood = await Food.find().lean();
        const aggData = allPlayers.reduce((prev: any, next: any, i) => {
            if(!prev || Object.keys(prev).length<=0) prev = { 
                aggPlayers: 0,
                aggTotDistanceInMeters: 0, 
                aggTotHeightInMeters: 0, 
                aggTotTimeInMinutes: 0, 
                aggTotCaloriesBurnt: 0 
            };
            prev = {
                aggPlayers: prev.aggPlayers+1,
                aggTotDistanceInMeters: prev.aggTotDistanceInMeters + next.aggregatedStats.distanceRiddenInMeters,
                aggTotHeightInMeters: prev.aggTotHeightInMeters + next.aggregatedStats.heightClimbedInMeters,
                aggTotTimeInMinutes: prev.aggTotTimeInMinutes + next.aggregatedStats.timeRiddenInMinutes, 
                aggTotCaloriesBurnt: prev.aggTotCaloriesBurnt + next.aggregatedStats.caloriesBurned
            };
            return prev;
        }, {});
        
        const foodEarned = allFood.map((o:any) => ({ 
            name: o.name,
            calories: o.calories,
            amountPer: o.amountPer,
            quantity: Math.round(aggData.aggTotCaloriesBurnt/o.calories)
        }));

        res.status(200).send({...aggData, foodEarned});
    } catch(e) {
        res.status(404).send(e.message);
    }
})