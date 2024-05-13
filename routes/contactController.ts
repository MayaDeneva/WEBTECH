import { Router } from 'express';
import mongoose from 'mongoose';
import { ContactModel } from '../models/contact.model' ;
import express, {Request, Response} from 'express';
const bcrypt = require('bcrypt');


const contactController = Router();

// Create Contact
contactController.post('/add', async (req, res) => {
    try {
        const { userId, email, username, password, name, profilePhoto} = req.body;
        if (!req.body.email || !req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'Missing required fields for the user!' });
        }

        const hashedPassword: string = await bcrypt.hashSync(req.body.password, 10);
        const contact = new ContactModel({
            userId,
            email,
            username,
            password: hashedPassword,
            name,
            profilePhoto,
            createdAt: Date.now,
            lastActive: Date.now
        });

        await contact.save();

        res.status(201).json({ message: 'Contact created successfully', contact });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get Contacts
contactController.get('/getAll', async (req, res) => {
    try {
        const contacts = await ContactModel.find();

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts were found' });
        }

        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json(error);
    }
});

contactController.get('/getById/:id', async (req, res) => {
    try {
        const contact = await ContactModel.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: 'The user was not found' });
        }

        return res.status(200).json(contact);
    } catch (error) {
        return res.status(500).json(error);
    }
});



export default contactController;