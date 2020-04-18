/** Data Model Interfaces */
import { Event, Events } from "../model/event.interface";
import { User, Users } from "../model/user.interface";
import { RelayWorld } from "../model/relay-world.interface";
import { ZwiftAuthResponse, ZwiftHeaders, ModifiedResponse } from "./zwift.interface";
import * as axios from 'axios';
import * as qs from "querystring";


/**
 * VARS
 */
const ZWIFT_SECURE_URL = process.env.ZWIFT_API_SECURE_URL;
const ZWFIT_URL = process.env.ZWIFT_API_URL;


/**
 * SET REQUEST HEADERS
 */
//  default Set Zwift Headers
const zwiftHeaders: ZwiftHeaders = {
    "Host": "us-or-rly101.zwift.com",
    "Connection": "keep-alive",
    "Zwift-Api-Version": "2.6",
    "Accept-Language": "en-GB",
    "Accept-Encoding": "gzip, deflate, br"
}

// set zwift headers with token
const setZwiftHeaderWithToken = (token: string): ZwiftHeaders => ({
    ...zwiftHeaders,
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`
});

// set zwift auth header
const zwiftAuthHeaders: ZwiftHeaders = {
    ...zwiftHeaders,
    "Host": "secure.zwift.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Zwift Companion/3.12.1 (iPhone; iOS 13.3.1; Scale/3.00)",
    "Accept": "*/*"
}

/**
 * RESPONSE MODIFIER
 */
// single document responst modifier
const responseModifier = (response: axios.AxiosResponse): Promise<ModifiedResponse> => {
    return Promise.resolve({
        statusCode: response.status,
        statusText: response.statusText,
        data: {...response.data}
    });
};

// Modify array response into Key, Value Objects
const arrayResponseModifier = (response: axios.AxiosResponse): Promise<ModifiedResponse> => {
    return Promise.resolve({
        statusCode: response.status,
        statusText: response.statusText,
        data: Object.assign({}, ...response.data.map((obj: any) => ({[obj.id]: obj})))
    });
};

/** log zwift error */
const logZwiftError = (err: Error): Promise<any> => {
    console.error('Zwift error', err);
    return Promise.reject(err);
}

/** handle and return response data only */
const responseHandler = (res: any): Users & User & Events & Event => {
    return res.data;
}

// TEMP MEASURES
const playerData: any = {
    "11993":{
       "id":11993,
       "firstName":"Dee",
       "lastName":"Maguire",
       "imageSrc":null,
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":372,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "62921":{
       "id":62921,
       "firstName":"Francesco",
       "lastName":"Mattia [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/4d1a1edb-41110",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":380,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":true
       }
    },
    "268307":{
       "id":268307,
       "firstName":"Anton",
       "lastName":"Riedel[DIRT-IM]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/f36d3bd5-644458",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":276,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "356200":{
       "id":356200,
       "firstName":"J-J",
       "lastName":"Chan [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/b082dcce-198260",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":true
       }
    },
    "420683":{
       "id":420683,
       "firstName":"Sonyi ",
       "lastName":"PingPong LFTC",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/389c93d5-937783",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "459609":{
       "id":459609,
       "firstName":"Henry",
       "lastName":"Ho {MBPC+LFTC}",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/73a9866a-246757",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"SELF",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "682425":{
       "id":682425,
       "firstName":"amanda",
       "lastName":"wilmer",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/808d5566-366454",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "696483":{
       "id":696483,
       "firstName":"Marius",
       "lastName":"Stuparu [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/9747739e-1198966",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":642,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "881202":{
       "id":881202,
       "firstName":"Themistoklis",
       "lastName":"Pollalis LFTC",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/593b200a-723238",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":300,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "921446":{
       "id":921446,
       "firstName":"Regis",
       "lastName":"Morio [LFTC]",
       "imageSrc":null,
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":250,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "943536":{
       "id":943536,
       "firstName":"Charlie",
       "lastName":"Miller",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/bfdd0f2e-524026",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "944536":{
       "id":944536,
       "firstName":"Greg",
       "lastName":"Maya [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/c1338f89-1116599",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":170,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "944659":{
       "id":944659,
       "firstName":"Stan",
       "lastName":"Colomb [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/1a3d5614-502031",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "974389":{
       "id":974389,
       "firstName":"Caleb",
       "lastName":"K [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/8fce68a4-685557",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":554,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1017958":{
       "id":1017958,
       "firstName":"Ollie",
       "lastName":"Capel",
       "imageSrc":null,
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1041509":{
       "id":1041509,
       "firstName":"Alejandro",
       "lastName":"Romero LFTC",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/07fde0f1-536745",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":724,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1083931":{
       "id":1083931,
       "firstName":"Hugh",
       "lastName":"Elphick LFTC",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/2f624fde-1066502",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1088171":{
       "id":1088171,
       "firstName":"sarah",
       "lastName":"bolton",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/23e6cc66-1227049",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1175142":{
       "id":1175142,
       "firstName":"Molly",
       "lastName":"Whitehall (LFTC)",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/1ff58b38-630392",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1331927":{
       "id":1331927,
       "firstName":"Luan",
       "lastName":"Dinh (LFTC)",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/c5acf46e-1029456",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1332743":{
       "id":1332743,
       "firstName":"Gerardo",
       "lastName":"Perez [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/9baac7b4-700089",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":484,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1333278":{
       "id":1333278,
       "firstName":"Luke",
       "lastName":"Sheard [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/88afe863-877851",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1398451":{
       "id":1398451,
       "firstName":"ottoline",
       "lastName":"martin",
       "imageSrc":null,
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1462590":{
       "id":1462590,
       "firstName":"Andy",
       "lastName":"Wakes [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/291442a2-1090107",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1477975":{
       "id":1477975,
       "firstName":"Charlotte ",
       "lastName":"Bell [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/17b77556-820411",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":true
       }
    },
    "1488215":{
       "id":1488215,
       "firstName":"Chris",
       "lastName":"Sainsbury LFTC",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/83108373-783544",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1540313":{
       "id":1540313,
       "firstName":"Thibald",
       "lastName":"Gerardin [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/25f87327-1092409",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":250,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1554202":{
       "id":1554202,
       "firstName":"Alex",
       "lastName":"Proy [RCC][LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/0112d043-808423",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":250,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1658504":{
       "id":1658504,
       "firstName":"gary",
       "lastName":"means LFTC",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/00966773-1182294",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1716145":{
       "id":1716145,
       "firstName":"Gordon",
       "lastName":"Logan (LFTC)",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/39e67b8c-944247",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":900,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1835665":{
       "id":1835665,
       "firstName":"Izzy",
       "lastName":"Jones",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/d5cd20a3-966490",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1849312":{
       "id":1849312,
       "firstName":"Sarah",
       "lastName":"Jones (LFTC)",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/d74d476e-1083325",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1930178":{
       "id":1930178,
       "firstName":"Sam",
       "lastName":"Cunningham ",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/b1a745a1-1029993",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":901,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "1989321":{
       "id":1989321,
       "firstName":"Toby",
       "lastName":"Read (LFTC)",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/c2fdfa42-1108348",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "2092253":{
       "id":2092253,
       "firstName":"Minna",
       "lastName":"Harrison [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/93c0a5f6-1205771",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":752,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "2119661":{
       "id":2119661,
       "firstName":"Laurent",
       "lastName":"BOSCHEREL",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/2c9f8343-1142112",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":250,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "2145512":{
       "id":2145512,
       "firstName":"chris",
       "lastName":"Xenos",
       "imageSrc":null,
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":300,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "2194166":{
       "id":2194166,
       "firstName":"Dan",
       "lastName":"AB [LFTC / LD] 3429",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/eb6ee028-1168610",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"NO_RELATIONSHIP",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "2294281":{
       "id":2294281,
       "firstName":"Michelle",
       "lastName":"Lovick (LFTC)",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/4eabbb39-1230086",
       "enrolledZwiftAcademy":false,
       "male":false,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    },
    "2294292":{
       "id":2294292,
       "firstName":"Greg",
       "lastName":"Divall [LFTC]",
       "imageSrc":"https://static-cdn.zwift.com/prod/profile/63ceedae-1230181",
       "enrolledZwiftAcademy":false,
       "male":true,
       "playerType":"NORMAL",
       "countryCode":826,
       "socialFacts":{
          "followerStatusOfLoggedInPlayer":"IS_FOLLOWING",
          "isFavoriteOfLoggedInPlayer":false
       }
    }
 };

const relayWorldResponseHandler = (res: any): RelayWorld => {

    const { friendsInWorld, ...data } = res.data;
    let counter = 0;
    const modifiedVer = friendsInWorld.reduce((prev: any, next: any) => {
        if(!prev) {
            if(!playerData[prev.playerId]) prev = {};
            else {
               prev = { [prev.playerId]: { id: prev.playerId,  ...prev } };
               counter++;
            }
        }
        if(playerData[next.playerId]) {
           prev = { ...prev, [next.playerId]: { id: next.playerId,  ...next } };
           counter++;
        }
        return prev;
    }, {});

    return { ...data, friendsInWorld: modifiedVer, playerCount: counter };

}

/**
 * SERVICE FUNCTIONS
 */
// get event by start and end timestamp
export const findEventsByTimeRange = async (
    token: string, 
    startTimestamp: number, 
    endTimestamp: number
): Promise<Events> => {
        const params = {
            "start_date": startTimestamp,
            "end_date": endTimestamp,
        };
        return axios.default.get(
            `${ZWFIT_URL}/api/private_event/feed`, 
            { 
                headers: setZwiftHeaderWithToken(token),
                params
            }
        )
        .then(arrayResponseModifier)
        .catch(logZwiftError)
        .then(responseHandler);
    }

// Login by username and password
export const emailLogin = async (email: string, password: string): Promise<ZwiftAuthResponse> => {
    const requestBody: qs.ParsedUrlQueryInput = {
        "client_id": "Zwift_Mobile_Link",
        "grant_type": "password",
        "username": email,
        "password": password
    };
    return axios.default.post(
        `${ZWIFT_SECURE_URL}/auth/realms/zwift/protocol/openid-connect/token`,
        qs.stringify(requestBody),
        { headers: zwiftAuthHeaders }
    )
    .then(responseModifier)
    .catch(logZwiftError)
    .then(res =>  Promise.resolve({...res.data}));
}

// login by refresh token
export const refreshTokenLogin = async (refreshToken: string): Promise<ZwiftAuthResponse> => {
    const requestBody: qs.ParsedUrlQueryInput = {
        "client_id": "Zwift_Mobile_Link",
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
    };

    return axios.default.post(
        `${ZWIFT_SECURE_URL}/auth/realms/zwift/protocol/openid-connect/token`, 
        qs.stringify(requestBody),
        { headers: zwiftAuthHeaders }
    )
    .then(responseModifier)
    .catch(logZwiftError)
    .then(res => Promise.resolve({...res.data}));
}

// Find a user by profile id
export const findUser = async (token: string, uid: string): Promise<User> => {
    return axios.default.get(`${ZWFIT_URL}/api/profiles/${uid}`, {
        headers: setZwiftHeaderWithToken(token)
    })
    .then(responseModifier)
    .catch(logZwiftError)
    .then(responseHandler);
}

// Find self
export const findUserSelf = async (token: string): Promise<User> => {
    return axios.default.get(`${ZWFIT_URL}/api/profiles/me`, {
        headers: setZwiftHeaderWithToken(token)
    })
    .then(responseModifier)
    .catch(logZwiftError)
    .then(responseHandler);
}

// Get User Stats by start and end datetime
export const getUserCyclingStats = async (token: string, uid: number, startDateTime:string, endDateTime: string): Promise<any> => {
    return axios.default.get(`${ZWFIT_URL}/api/profiles/${uid}/statistics`, {
        headers: setZwiftHeaderWithToken(token),
        params: {
            startDateTime,
            endDateTime,
            sport: "CYCLING"
        }
    })
    .then(responseModifier)
    .catch(logZwiftError)
    .then(responseHandler);
}

export const getRelayWorldFeed = async (token: string): Promise<any> => {

    return axios.default.get(`${ZWFIT_URL}/relay/worlds/1`, {
        headers: setZwiftHeaderWithToken(token)
    })
    .then(responseModifier)
    .catch(logZwiftError)
    .then(relayWorldResponseHandler);

}
