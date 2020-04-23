import { 
    FinalEventPlayer as IFinalEventPlayer
} from './finalEventPlayer.interface';
import * as mongoose from 'mongoose';
import { mongoosePagination } from 'ts-mongoose-pagination';
export type FinalEventPlayerDocument = mongoose.Document & IFinalEventPlayer;

const playerAggStatsSchema = new mongoose.Schema({
    startDateTime: String,
    endDateTime: String,
    distanceRiddenInMeters: Number,
    heightClimbedInMeters: Number,
    timeRiddenInMinutes: Number,
    caloriesBurned: Number
})

export const finalEventPlayerSchema = new mongoose.Schema({
    id: { type: Number, unique: true},
    firstName: String,
    lastName: String,
    male: Boolean,
    imageSrc: String,
    playerTypeId: Number,
    ftp: Number,
    totalDistance: Number,
    totalDistanceClimbed: Number,
    totalTimeInMinutes: Number,
    aggregatedStats: playerAggStatsSchema,
    isAgreedToShare: Boolean
});

finalEventPlayerSchema.plugin(mongoosePagination);

export const FinalEventPlayer: mongoose.PaginateModel<FinalEventPlayerDocument> = mongoose.model("FinalEventPlayer", finalEventPlayerSchema);