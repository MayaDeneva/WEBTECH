import { Router } from 'express';
import mongoose from 'mongoose';
import { MessageModel } from '../models/message.model';

const messageController = Router();


// Create Message
messageController.post('/add', async (req, res) => {
    try {
        const { messageId, convoId, sentBy, content, sentAt, received, seen } = req.body;

        // Create a new message document
        const message = new MessageModel({
            messageId,
            convoId,
            sentBy,
            content,
            sentAt,
            received,
            seen
        });

        // Save the message to the database
        await message.save();

        res.status(201).json({ message: 'Message created successfully', newMessage:message });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Messages by Conversation (Channel)
messageController.get('/getByChannel', async (req, res) => {
    try {
        const { convoId } = req.query;

        if (!convoId) {
            return res.status(400).json({ error: 'Missing convoId in query parameters' });
        }
        const messages = await MessageModel.find({ convoId });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

messageController.delete('/deleteByMessageId/:messageId', async (req, res) => {
    try {
        const { messageId } = req.params;

        // Find the message by ID and delete it
        const message = await MessageModel.findByIdAndDelete(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default messageController;