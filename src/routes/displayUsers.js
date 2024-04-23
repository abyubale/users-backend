import express from 'express';
import route from './route.json' assert { type: 'json' };
import User from '../models/User.js';

const displayUsers = express.Router();

displayUsers.get(route.root, async (req, res) => {
  const users = await User.find({});
  res.render('users', { title: 'Home Page', users: users });
});

export default displayUsers;
