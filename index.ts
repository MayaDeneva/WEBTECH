const express = require('express');
const dotenv = require('dotenv');

import { connect } from 'mongoose';

const { connect: connectAPI } = require('./routes');

dotenv.config();

const app = express();

app.use(express.json());

connectAPI(app, '/api');

app.listen(process.env.PORT, async () => {
    await connect(process.env.DB_CONNECTION_STRING as string);

    console.log('The server and database are connected.')
});