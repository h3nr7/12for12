import * as express from 'express';
import { FinalEventPlayer, finalEventPlayerSchema } from '../model/finalEventPlayer';
import { 
    FinalEventPlayer as IFinalEventPlayer
} from '../model/finalEventPlayer.interface';
export const finalEventController = express.Router();

finalEventController.post('/players/bulk', async (req: express.Request, res: express.Response) => {
    try {
        const playerData: [IFinalEventPlayer] = req.body.players;
        const result = await FinalEventPlayer.insertMany(playerData)
            .catch(e => {console.log(e); return Promise.reject(e);})
        res.status(200).send({result});
    } catch(e) {
        res.status(404).send(e.message);
    }
});

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