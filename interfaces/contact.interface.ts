import { ObjectId } from 'mongodb';

export interface Contact{
    userId: ObjectId,
    email: string,
    username: string,
    password: string,
    name: string,
    profilePhoto: string,
    createdAt: Date,
    lastActive: Date
}

