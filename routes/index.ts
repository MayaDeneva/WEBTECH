import { Application, Router } from 'express';

import contactController from './contactController';
import messageController from './messageController';
import channelController from './channelController';

const router = Router();

export const connect = (app: Application, path: string): void => {
    router.use('/contacts', contactController);
    router.use('/messages', messageController);
    router.use('/channels', channelController);

    app.use(path, router);
}

