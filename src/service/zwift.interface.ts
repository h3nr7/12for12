// Zwift Auth Response
export interface ZwiftAuthResponse {
    "access_token": string;
    "expires_in": number;
    "refresh_expires_in": number;
    "refresh_token": string;
    "token_type": string;
    "not-before-policy"?: number;
    "session_state"?: string;
}

/** zwift headers interface */
export interface ZwiftHeaders {
    "Host": string;
    "Connection": string;
    "Zwift-Api-Version": string;
    "Authorization"?: string;
    "Accept"?: string;
    "Accept-Language"?: string;
    "Accept-Encoding"?: string,
    "Content-Type"?: string,
    "User-Agent"?: string,
}

/** interface of modified response */
export interface ModifiedResponse {
    statusCode: number,
    statusText: string,
    data: any,
    headers?: any,
    config?: any
}