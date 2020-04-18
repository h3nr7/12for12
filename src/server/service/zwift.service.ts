/** Data Model Interfaces */
import { Event, Events } from "../model/event.interface";
import { User, Users } from "../model/user.interface";
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
