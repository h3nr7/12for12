import { IPagination } from './IPagination';

interface IAggStats {
    startDateTime: string;
    endDateTime: string;
    distanceRiddenInMeters: number;
    heightClimbedInMeters: number;
    timeRiddenInMinutes: number;
    caloriesBurned: number;

}

export interface IParticipant {
    id?: number;
    firstName: string;
    lastName: string;
    male: boolean;
    imageSrc?: string;
    playerTypeId?: number;
    ftp?: number;
    totalDistance?: number,
    totalDistanceClimbed?: number;
    totalTimeInMinutes?: number;
    aggregatedStats: IAggStats;
    isNonZwift?: boolean;
    isAgreedToShare: boolean;
}

export interface IParticipants {
    data: Array<IParticipant>;
    pagination: IPagination;
}