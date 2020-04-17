import { RelayWorld as IRelayWorld, Player as IPlayer } from './relay-world.interface';
import mongoose from 'mongoose';
export type RelayWorldDocument = mongoose.Document & IRelayWorld;


export const playerSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    playerId: {type: Number, unique: true},
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
})

export const relayWorldSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    worldId: {type: Number, unique: true},
    name: String,
    playerCount: Number,
    currentWorldTime: Number,
    currentDateTime: Number,
    friendsInWorld: { type: Map, of: playerSchema }
});

export const RelayWorld = mongoose.model<RelayWorldDocument>("RelayWorld", relayWorldSchema);