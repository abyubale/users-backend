import express from 'express';
import apiRoute from './routes/apiRoute.js';
import route from './routes/route.json' assert { type: 'json' };
import removeExpressHeader from './middleware/removeExpressHeader.js';
import logger from './middleware/logger.js';
import displayUsers from './routes/displayUsers.js';
import searchUsers from './routes/searchUsers.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(logger('logs/log.txt'));

app.use(express.static('public'));

app.use(removeExpressHeader());

app.use(route.api, apiRoute);
app.use(route['show-users'], displayUsers);
app.use(route['search-users'], searchUsers);

export default app;
