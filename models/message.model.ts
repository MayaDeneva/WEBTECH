import { Schema, model } from 'mongoose';
import { Message } from '../interfaces/message.interface';

const MessageSchema = new Schema<Message>({
    messageId: Schema.Types.ObjectId,
    convoId: { type: Schema.Types.ObjectId, ref: 'Channel' }, 
    sentBy: { type: Schema.Types.ObjectId, ref: 'Contact' }, 
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    received: { type: Boolean, default: false },
    seen: { type: Boolean, default: false }
});

export const MessageModel = model<Message>('Message', MessageSchema);
