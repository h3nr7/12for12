/** Data Model Interafaces */
import { User } from "./user.interface";
import { Users } from "./users.interface";

/** Store */

const users: Users = {
    1: {
        id: 1,
        name: "Henry",
        description: "I am Henry",
        avatar: "https://somelink.com"
    },
    2: {
        id: 2,
        name: "Roger",
        description: "I am Roger",
        avatar: "https://somelinke2.com"
    }

}

/** Service Methods */
export const findAll = async (): Promise<Users> => {
    return users;
}

export const find = async (id: number): Promise<User> => {
    const record: User = users[id];

    if(record) return record;

    throw new Error("No record found");
}

export const create = async (newUser: User): Promise<void> => {
    const id = new Date().valueOf();
    users[id] = {
        ...newUser,
        id
    };
}

export const update = async (updatedUser: User): Promise<void> => {
    if(users[updatedUser.id]) {
        users[updatedUser.id] = updatedUser;
        return;
    }

    throw new Error("No record found to update");
}

export const remove = async (id: number): Promise<void> => {
    const record = users[id];
    if(record) {
        delete users[id];
        return;
    }

    throw new Error("No record found to delete");
}

