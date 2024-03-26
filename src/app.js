import express from 'express';
import apiRoute from './routes/apiRoute.js';

const app = express();

app.use('/api', apiRoute);

export default app;
