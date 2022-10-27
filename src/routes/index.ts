import { Router } from 'express';
import usersRouter from './users';
import announcementRouter from './announcement';
import authenticationRouter from './authentication';
import settingsRouter from './settings';


const routes = Router();

routes.use('/users', usersRouter);
routes.use('/announcement', announcementRouter);
routes.use('/authentication', authenticationRouter);
routes.use('/settings', settingsRouter);

export default routes;