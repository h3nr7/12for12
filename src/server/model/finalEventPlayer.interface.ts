export interface PlayerAggStats {
    startDateTime: string,
    endDateTime: string,
    distanceRiddenInMeters: number,
    heightClimbedInMeters: number,
    timeRiddenInMinutes: number,
    caloriesBurned: number

}
export interface FinalEventPlayer {
    id?: number,
    firstName: string,
    lastName: string,
    male: boolean,
    imageSrc?: string,
    playerTypeId?: number,
    ftp?: number,
    totalDistance?: number,
    totalDistanceClimbed?: number,
    totalTimeInMinutes?: number,
    aggregatedStats: PlayerAggStats,
    isNonZwift?: boolean,
    isAgreed: boolean
}