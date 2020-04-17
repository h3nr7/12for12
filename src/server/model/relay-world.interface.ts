
// Player currently playing
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

export interface Players {
    [id: number]: Player
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