import express, { urlencoded } from 'express';
import apiRoute from './routes/apiRoute.js';
import route from './routes/route.json' assert { type: 'json' };

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(route.api, apiRoute);

export default app;
