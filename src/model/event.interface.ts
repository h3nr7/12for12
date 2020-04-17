import { User, Users } from './user.interface';

/** interface for Event */
export interface Event {
    // fields in events/{events_id} endpoint
    id: number,
    sport: string,
    eventStart: string,
    routeId: number,
    startLocation: number,
    durationInSeconds: number,
    durationInMeters: number,
    description: string,
    workoutHash: number,
    showResults: boolean,
    laps: number,
    organizerId: number,
    // fields in events/feed
    organizerProfileId: number,
    organizerProfileFirstName: string,
    organizerProfileLastName: string,
    eventSubgroupId: number,
    name: string,
    invitedTotalCount: number,
    acceptedTotalCount: number,
    updatedDate: string,
    rubberbanding: boolean, 
    // Custom fields
    invitedUsers: Users //or number[], same thing
}
// interface for events with id as keys
export interface Events {
    [id: number]: Event
}