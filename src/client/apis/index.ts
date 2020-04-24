import * as axios from "axios";

export const getUserStats = async (id:string, startDateTime:string, endDateTime:string) => {
    const res = await axios.default.request({
        url: `/api/users/${id}/stats`, 
        method: 'PUT',
        params: { startDateTime, endDateTime },
        data: { token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPLUVjXzJJNjg5bW9peGJIZzFfNDZDVFlGeEdZMDViaDluYm5Mcjl0RzY4In0.eyJqdGkiOiJhN2QwNDg2Ni03YjUxLTRiOTktYjkyMS1lMTI5NzUxMDNhZDciLCJleHAiOjE1ODcyMjAyNjQsIm5iZiI6MCwiaWF0IjoxNTg3MTk4NjY0LCJpc3MiOiJodHRwczovL3NlY3VyZS56d2lmdC5jb20vYXV0aC9yZWFsbXMvendpZnQiLCJhdWQiOiJad2lmdF9Nb2JpbGVfTGluayIsInN1YiI6ImJhNWEyZjc3LWY3ZGItNDdiMi1hOWE1LTUxOWY0YzViNDFkZSIsInR5cCI6IkJlYXJlciIsImF6cCI6Ilp3aWZ0X01vYmlsZV9MaW5rIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiMjUxNGU0ODctYWU4ZC00NzE2LTkzYjMtNTJjNDQ5YzNiZDFiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJldmVyeWJvZHkiLCJ0cmlhbC1zdWJzY3JpYmVyIiwiZXZlcnlvbmUiLCJiZXRhLXRlc3RlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImVtYWlsLXByZWZzLXNlcnZpY2UiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJteS16d2lmdCI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIkdhbWVfTGF1bmNoZXIiOnsicm9sZXMiOlsiYXV0aGVudGljYXRlZC11c2VyIl19LCJzc28tZ2F0ZXdheSI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sInN1YnNjcmlwdGlvbi1zZXJ2aWNlIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgUkVTVCBBUEkgLS0gcHJvZHVjdGlvbiI6eyJyb2xlcyI6WyJhdXRob3JpemVkLXBsYXllciIsImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiWndpZnQgWmVuZGVzayI6eyJyb2xlcyI6WyJhdXRoZW50aWNhdGVkLXVzZXIiXX0sIlp3aWZ0IFJlbGF5IFJFU1QgQVBJIC0tIHByb2R1Y3Rpb24iOnsicm9sZXMiOlsiYXV0aG9yaXplZC1wbGF5ZXIiXX0sImVjb20tc2VydmVyIjp7InJvbGVzIjpbImF1dGhlbnRpY2F0ZWQtdXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6IkhlbnJ5IEhvIHtNQlBDK0xGVEN9IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGVucnl5cC5ob0BnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSGVucnkiLCJmYW1pbHlfbmFtZSI6IkhvIHtNQlBDK0xGVEN9IiwiZW1haWwiOiJoZW5yeXlwLmhvQGdtYWlsLmNvbSJ9.PvxkJpbg6FlS6qI2OJIrzoU9vcREuQqkMPiNYzxejEPizqW_Xkro4HSdG6Ooj3cejyfeDPhUolq6OJSqBXKmsfbHeuVMJQq_8zdsSb9eru-OLwyfgPoe7qx6MWZoGzmfrsR_uvzk0FMggJrr3nB5j4e_T1rB-tpQkm8OwAnGqSat0jqoQ7Q3HYzFe_ZilEFWuVHROjMGjeLOpCCsuJuz6NJQwrArtLS1lCBWwe_-pBvXCAklq3EOlXRBJvu2RZy5SLNu7XEwj8gKtK5l-dBik8yJU3NZFe_i6zYXN8-I_eKN_0huT21jIGypySrjCoxrjKPHtuhcmUBTH1xNsb9clw" 
    }})

    return res.data
}

export const getAggregatedFeed = async () => {
    const res = await axios.default.get("/api/relay/agreggated/feed");
    return res.data;
}

export const getLatestSavedFeed = async () => {
    const res = await axios.default.get("/api/relay/saved/feed");
    return res.data;
}

/** GET PLAYERS */
export const getPlayers = async () => {
    const res = await axios.default.get("/api/event12for12/players");
    return res.data;
}

/** GET AGG RESULTS */
export const getAggStats = async ({agreedToShare}: any) => {
    let params:any = {};
    if(agreedToShare) params.agreedToShare = agreedToShare;
    const res = await axios.default.get("/api/event12for12/results/agg", {
        params
    });
    return res.data;
}

export const getCrowdfundingDetails = async () => {
    let headers:{} = {
        Accept: "application/json"
    };
    const res = await axios.default.get("https://api.justgiving.com/a2cca337/v1/crowdfunding/pages/lftc12-for-12-challenge", {
        headers
    });
    return res.data;
}