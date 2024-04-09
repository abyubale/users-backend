import express, { json } from 'express';
import usersData from '../../db/users.json' assert { type: 'json' };
import route from './route.json' assert { type: 'json' };
import fs from 'fs';
import {
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isMobileValid,
} from '../utils/validator.js';
import ApiError from '../utils/ApiError.js';

const usersRoute = express.Router();

usersRoute.get(route.root, (req, res) => {
  res.json(usersData);
});

usersRoute.get('/:userId', (req, res) => {
  const userId = +req.params.userId;
  const userData = usersData.find((user) => user.id === userId);
  if (userData && Object.keys(userData).length > 0) {
    res.json(userData);
  } else {
    res.status(404).json({ status: 'fails', message: 'user not found' });
  }
});

usersRoute.delete('/:userId', (req, res) => {
  const userId = +req.params.userId;
  const userIndex = usersData.findIndex((user) => user.id === userId);
  if (userIndex >= 0) {
    usersData.splice(userIndex, 1);
    fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
      if (err) {
        res.status(500).json(new ApiError('failed to delete user', 500));
      } else {
        res.status(204).json();
      }
    });
  } else {
    res.status(404).json({ status: 'error', message: 'user not found' });
  }
});

usersRoute.post(route.root, (req, res) => {
  const { first_name, last_name, email, phone, avatar } = req.body;

  if (
    first_name &&
    isFirstNameValid(first_name) &&
    last_name &&
    isLastNameValid(last_name) &&
    email &&
    isEmailValid(email) &&
    phone &&
    isMobileValid(phone) &&
    avatar
  ) {
    const newId = usersData[usersData.length - 1].id + 1;
    const newUser = { id: newId, first_name, last_name, email, phone, avatar };
    usersData.push(newUser);
    fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
      if (err) {
        res
          .status(500)
          .json({ status: 'fail', message: 'failed to create new user' });
      } else {
        res.status(201).json({
          status: 'success',
          message: 'user created succesfully',
          data: newUser,
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ status: 'fail', message: 'user data is not valid or missing' });
  }
});

usersRoute.put('/:userId', (req, res) => {
  const { first_name, last_name, email, phone, avatar } = req.body;
  const userId = +req.params.userId;

  const updatedUser = {};
  if (first_name) updatedUser.first_name = first_name;
  if (last_name) updatedUser.last_name = last_name;
  if (email) updatedUser.email = email;
  if (phone) updatedUser.phone = phone;
  if (avatar) updatedUser.avatar = avatar;
  const userIndex = usersData.findIndex((user) => user.id === userId);
  if (userIndex !== -1 && Object.keys(updatedUser).length) {
    const updatedUserData = { ...usersData[userIndex], ...updatedUser };
    usersData[userIndex] = updatedUserData;
    fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
      if (err) {
        res
          .status(500)
          .json({ status: 'fail', message: 'failed to update user' });
      } else {
        res.json({
          status: 'success',
          message: 'user updated succesfully',
          data: updatedUserData,
        });
      }
    });
  } else if (userIndex === -1) {
    res.status(404).json({ status: 'fail', message: 'User not found' });
  } else {
    res.status(404).json({ status: 'fail', message: 'give user data' });
  }
});

export default usersRoute;
