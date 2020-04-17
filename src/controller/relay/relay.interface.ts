import { RelayWorldUser } from './relay-world-user.interface';


export interface relay {
    worldId: number;
    name: string;
    playerCount: number;
    currentWorldTime: number;
    currentDateTime: number;
    frieldsInWorld: [RelayWorldUser]

}