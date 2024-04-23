import express, { query } from 'express';
import route from './route.json' assert { type: 'json' };
import User from '../models/User.js';

const searchUsers = express.Router();

searchUsers.get(route.root, async (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const email = req.query.email;
  const age = req.query.age;

  let filter = {};
  if (firstName) filter.first_name = new RegExp(firstName, 'i');
  if (lastName) filter.last_name = new RegExp(lastName, 'i');
  if (email) filter.email = new RegExp(email, 'i');
  if (age) filter.age = { $gt: 18 };

  const searchedUser = await User.find(filter);
  if (searchedUser) {
    res.render('searchUsers', {
      users: searchedUser,
      query: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
      },
    });
  } else {
    console.error('Error:', err);
    res.status(500).send('Error searching users');
  }
});

export default searchUsers;
