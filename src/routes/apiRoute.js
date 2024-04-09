import express from 'express';
import weatherRoute from './weatherRoute.js';
import usersRoute from './usersRoute.js';
import route from './route.json' assert { type: 'json' };
const apiRoute = express.Router();

apiRoute.use(route.weather, weatherRoute);
apiRoute.use(route.users, usersRoute);

export default apiRoute;
