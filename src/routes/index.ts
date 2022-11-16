import { Router } from 'express';
import usersRouter from './users';
import announcementRouter from './announcement';
import authenticationRouter from './authentication';
import settingsRouter from './settings';
import addressRouter from './address';


const routes = Router();

routes.use('/users', usersRouter);
routes.use('/address', addressRouter);
routes.use('/announcement', announcementRouter);
routes.use('/authentication', authenticationRouter);
routes.use('/settings', settingsRouter);

export default routes;