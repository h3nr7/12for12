export interface Player {
    playerId: number;
    firstName: string;
    lastName: string;
    totalDistanceInMeters: number;
    rideDurationInSeconds: number;
    countryISOCode?: number;
    playerType?: string;
    followerStatusOfLoggedInPlayer: string;
    rideOnGiven?: boolean;
    currentSport: string;
    male?: boolean;
    enrolledZwiftAcademy?: boolean;
    mapId: number;
    ftp: number;
    runTime10kmInSeconds?: number;
}
