import * as mongoose from 'mongoose';
import { Player as IPlayer } from './player.interface';


export type PlayerDocument = mongoose.Document & IPlayer;

/** Model schema */
export const playerSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    playerId: { type: Number, unique: true },
    firstName: String,
    lastName: String,
    totalDistanceInMeters: Number,
    rideDurationInSeconds: Number,
    countryISOCode: Number,
    playerType: String,
    followerStatusOfLoggedInPlayer: String,
    rideOnGiven: Boolean,
    currentSport: String,
    male: Boolean,
    enrolledZwiftAcademy: Boolean,
    mapId: Number,
    ftp: Number,
    runTime10kmInSeconds: Number
});

export const Event = mongoose.model<PlayerDocument>("Player", playerSchema);