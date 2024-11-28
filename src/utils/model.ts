import type {LiveRoomUser, MetaData, User} from "@/api/model";


export const MetaID = (meta: MetaData) => {
    return meta.Provider + "_" + meta.Identifier;
}

export const getUsername = (user: LiveRoomUser | User) => {
    if ('Username' in user) {
        return user.Username;
    } else {
        return user.Name;
    }
}
