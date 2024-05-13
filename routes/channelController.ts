import { Router } from 'express';
import mongoose from 'mongoose';
import { ChannelModel } from '../models/channel.model';
import contactController from './contactController';

const channelController = Router();

// Create Channel
channelController.post('/add', async (req, res) => {
    try {
        const { channelID, name, created, members, photo } = req.body;

        // Create a new channel document
        const channel = new ChannelModel({
            channelID,
            name,
            created,
            members,
            photo
        });

        // Save the channel to the database
        await channel.save();

        res.status(201).json({ message: 'Channel created successfully', channel });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Channels
contactController.get('/getAll', async (req, res) => {
    try {

        const channels = await ChannelModel.find();

        res.status(200).json({ channels });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default channelController;