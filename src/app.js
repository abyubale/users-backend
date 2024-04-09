import express from 'express';
import apiRoute from './routes/apiRoute.js';
import route from './routes/route.json' assert { type: 'json' };
import removeExpressHeader from './middleware/removeExpressHeader.js';
import logger from './middleware/logger.js';

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(logger('logs/log.txt'));

app.use(express.static('public'));

app.use(removeExpressHeader());

app.use(route.api, apiRoute);

export default app;
