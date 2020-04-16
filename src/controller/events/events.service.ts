/** Data Model Interfaces */
import { Event } from "./event.interface";
import { Events } from "./events.interface";


const events: Events = {
    // 
}

export const findAll = async (): Promise<Events> => {
    return events;
}

export const findAllToday = async (): Promise<Events> => {
    return events
}