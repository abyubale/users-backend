import express from 'express';
import usersData from '../../db/users.json' assert { type: 'json' };
const usersRoute = express.Router();

usersRoute.get('/', (req, res) => {
  res.json(usersData);
});

export default usersRoute;
