import express, { json } from 'express';
import route from './route.json' assert { type: 'json' };
import upload from '../utils/Upload.js';
import {
  CreateUser,
  deleteUserById,
  getUserById,
  getUsers,
  UpdateUserById,
} from '../controllers/users.js';

const usersRoute = express.Router();

usersRoute.get(route.root, getUsers);

usersRoute.get('/:userId', getUserById);

usersRoute.delete('/:userId', deleteUserById);

usersRoute.post(route.root, upload.single('avatar'), CreateUser);

usersRoute.put('/:userId', UpdateUserById);

export default usersRoute;
