export interface User {
    id: number;
    firstName: string;
    lastName: string,
    male: boolean,
    imageSrc: string;
    imageSrcLarge?: string,
    playerType: string,
    playerTypeId: number,
    countryCode: number,
    useMetric?: boolean,
    age?: number,
    ftp?: number,
    totalDistance?: number,
    totalDistanceClimbed?: number,
    totalTimeInMinutes?: number,
    totalWattHours?: number
}

export interface Users {
    [id: number]: User
}