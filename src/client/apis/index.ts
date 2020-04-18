import * as axios from "axios";

export const getUser = async () => {

}

export const getData = async () => {
    const res = await axios.default.get("/api/relay/live");
    return res.data;
}