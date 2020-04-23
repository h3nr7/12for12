
// Player currently playing
import { Player  as IPlayer } from './player.interface';

export interface Players {
    [id: number]: IPlayer
}


// current relay world
export interface RelayWorld {
    worldId: number;
    name: string;
    playerCount: number;
    currentWorldTime: number;
    currentDateTime: number;
    friendsInWorld: Players
}