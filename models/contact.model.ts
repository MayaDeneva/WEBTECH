import {Schema, model} from 'mongoose';
import { Contact } from '../interfaces/contact.interface';

const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


const ContactSchema = new Schema<Contact>({
    userId: Schema.Types.ObjectId,
    email: {
		type: String,
		required: true,
		match: [emailRegex, 'Invalid email']
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		match: [passwordRegex, 'Invalid password! It must contain minimum eight characters, at least one letter and one number!']
	},
    name: {
        type: String,
        required : false,
        default: function() {
            return this.username;
        }
    },
    profilePhoto: { type: String, default: '\avatar.jpg' },
    createdAt: {type: Date, default: Date.now},
    lastActive: {type: Date, default: Date.now}

});

export const ContactModel = model('Contact', ContactSchema);