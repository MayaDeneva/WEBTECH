import { ObjectId } from 'mongodb';
export interface Channel {
    channelID: ObjectId,
    name: string,
    created: Date,
    members: ObjectId[]
    photo: string
}