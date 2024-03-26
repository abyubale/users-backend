import express from 'express';
import weatherRoute from './weatherRoute.js';
import usersRoute from './usersRoute.js';

const apiRoute = express.Router();

apiRoute.use('/weather-details', weatherRoute);
apiRoute.use('/users', usersRoute);

export default apiRoute;
