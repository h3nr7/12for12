import mongoose from 'mongoose';
import { Event as EventInterface } from './event.interface';
import { userSchema } from './user';
export type EventDocument = mongoose.Document & EventInterface;

/** Model schema */
export const eventSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    sport: String,
    eventStart: String,
    routeId: Number,
    startLocation: Number,
    durationInSeconds: Number,
    durationInMeters: Number,
    description: String,
    workoutHash: Number,
    showResults: Boolean,
    laps: Number,
    organizerId: Number,
    organizerProfileId: Number,
    organizerProfileFirstName: String,
    organizerProfileLastName: String,
    eventSubgroupId: Number,
    name: String,
    invitedTotalCount: Number,
    acceptedTotalCount: Number,
    updatedDate: String,
    rubberbanding: Boolean, 
    invitedUserIds: { type: Map, of: userSchema }
});

export const Event = mongoose.model<EventDocument>("Event", eventSchema);