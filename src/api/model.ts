export interface Picture {
    Url: string
    Data: string
}


export interface MetaData {
    Provider: string
    Identifier: string
}

export interface MediaInfo {
    Title: string
    Artist: string
    Cover: Picture
    Album: string
    Meta: MetaData
}

export interface User {
    Name: string
}

export interface UserMedal {
    Name: string
    Level: number
    RoomID: string
}

export interface LiveRoomUser{
    Uid: string
    Username: string
    Admin: boolean
    Privilege: number
    Medal: UserMedal
}

export interface Media {
    Info: MediaInfo
    User: User | LiveRoomUser
}

export interface EventData {
    EventID: string
    Data:any
}

export interface PlaylistInfo {
    Meta: MetaData
    Title: string
}

export interface Lyrics {
    Lang: string;
    Content: LyricLine[];
}

export interface LyricLine {
    Time: number; // in seconds
    Lyric: string;
}