import { ObjectId } from "mongodb";

export interface Message {
    messageId: ObjectId,
    convoId: ObjectId,
    sentBy: ObjectId,
    content: string,
    sentAt: Date,
    received: boolean,
    seen: boolean
}