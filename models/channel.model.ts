// import { ObjectId } from 'mongodb';
import { Document, Schema, Model, model } from 'mongoose';
import { Channel } from '../interfaces/channel.interface';

const channelSchema = new Schema<Channel>({
    channelID: { type: Schema.Types.ObjectId},
    name: { type: String, required: false },
    created: { type: Date, required: true, default: Date.now },
    members: { type: [Schema.Types.ObjectId], required: true },
    photo: { type: String, required: false, default: '' }
});

export const ChannelModel = model<Channel>('Channel', channelSchema);
