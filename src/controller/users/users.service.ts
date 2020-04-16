/** Data Model Interafaces */
import { User } from "./user.interface";
import { Users } from "./users.interface";
import { ZwiftAuthResponse } from "./auth-response.interface";
import { ZwiftHeaders } from "./zwift-headers.interface";
import { ModifiedResponse } from "./modified-response.interface";
import axios, { AxiosResponse } from "axios";
import qs, { ParsedUrlQueryInput } from "querystring";
import { NextFunction } from "express";

const ZWIFT_SECURE_URL = process.env.ZWIFT_API_SECURE_URL;
const ZWFIT_URL = process.env.ZWIFT_API_URL;


/** Helper */
const zwiftHeaders: ZwiftHeaders = {
    "Host": "us-or-rly101.zwift.com",
    "Connection": "keep-alive",
    "Zwift-Api-Version": "2.6",
    "Accept-Language": "en-GB",
    "Accept-Encoding": "gzip, deflate, br"
}

const zwiftAuthHeaders: ZwiftHeaders = {
    ...zwiftHeaders,
    "Host": "secure.zwift.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Zwift Companion/3.12.1 (iPhone; iOS 13.3.1; Scale/3.00)",
    "Accept": "*/*"
}

const setZwiftHeaderWithToken = (token: string): ZwiftHeaders => ({
    ...zwiftHeaders,
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`
});

const responseModifier = (response: AxiosResponse): Promise<ModifiedResponse> => {
    return Promise.resolve({
        statusCode: response.status,
        statusText: response.statusText,
        data: {...response.data}
    });
};

const logZwiftError = (err: Error): Promise<any> => {
    console.error('Zwift error', err);
    return Promise.reject(err);
}

const userResponseHandler = (res: any): User => {
    const {id, firstName , lastName, male, imageSrc, imageSrcLarge} = res.data;
    const outUser: User = {id, firstName, lastName, male, imageSrc, imageSrcLarge};
    return outUser;
}

/** Service Methods */
// Login by username and password
export const emailLogin = async (email: string, password: string): Promise<ZwiftAuthResponse> => {
    const requestBody: ParsedUrlQueryInput = {
        "client_id": "Zwift_Mobile_Link",
        "grant_type": "password",
        "username": email,
        "password": password
    };
    return axios.post(
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
    const requestBody: ParsedUrlQueryInput = {
        "client_id": "Zwift_Mobile_Link",
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
    };

    return axios.post(
        `${ZWIFT_SECURE_URL}/auth/realms/zwift/protocol/openid-connect/token`, 
        qs.stringify(requestBody),
        { headers: zwiftAuthHeaders }
    )
    .then(responseModifier)
    .catch(logZwiftError)
    .then(res => Promise.resolve({...res.data}));
}

// Find a user by profile id
export const find = async (token: string, uid: string): Promise<User> => {
    return axios.get(`${ZWFIT_URL}/api/profiles/${uid}`, {
        headers: setZwiftHeaderWithToken(token)
    })
    .then(responseModifier)
    .catch(logZwiftError)
    .then(userResponseHandler);
}

// Find self
export const findSelf = async (token: string): Promise<User> => {
    return axios.get(`${ZWFIT_URL}/api/profiles/me`, {
        headers: setZwiftHeaderWithToken(token)
    })
    .then(responseModifier)
    .catch(logZwiftError)
    .then(userResponseHandler);
}

// Get all followers

// Get all followees
