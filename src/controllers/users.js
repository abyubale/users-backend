import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';
import {
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isMobileValid,
} from '../utils/validator.js';
import { deleteFromCloud, uploadCloud } from '../utils/UploadCloud.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(new ApiError('Error in DB', 500, true));
  }
};

export const CreateUser = async (req, res) => {
  const { first_name, last_name, email, phone, avatar } = req.body;

  if (
    first_name &&
    isFirstNameValid(first_name) &&
    last_name &&
    isLastNameValid(last_name) &&
    email &&
    isEmailValid(email) &&
    phone &&
    isMobileValid(phone)
  ) {
    const newId = usersData[usersData.length - 1].id + 1;
    const newUser = { id: newId, first_name, last_name, email, phone, avatar };
    if (req.file && req.file.path) {
      try {
        const cloudUrl = await uploadCloud(req.file.path);
        newUser.avatar = cloudUrl;
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json(new ApiError('Error Uploading the file', 500, true));
      }
    }

    try {
      const user = new User(newUser);
      const result = await user.save();
      res.status(201).json(result);
    } catch (err) {
      console.log('error in DB saving', err);
      res
        .status(500)
        .json(new ApiError('failed to create new user', 500, true));
    }
  } else {
    res
      .status(400)
      .json(new ApiError('user data is not valid or missing', 400, true));
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    return user
      ? res.json(user)
      : res.status(404).json(new ApiError('user not found', 404, true));
  } catch (err) {
    console.error(err);
    return res.status(500).send(new ApiError('Error in DB', 500, true));
  }
};

export const UpdateUserById = async (req, res) => {
  const { first_name, last_name, email, phone, avatar } = req.body;
  const userId = req.params.userId;

  const updatedUser = {};
  if (first_name) updatedUser.first_name = first_name;
  if (last_name) updatedUser.last_name = last_name;
  if (email) updatedUser.email = email;
  if (phone) updatedUser.phone = phone;
  if (avatar) updatedUser.avatar = avatar;
  const userIndex = usersData.findIndex((user) => user.id === userId);
  if (Object.keys(updatedUser).length) {
    try {
      const updateUser = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });
      return updateUser
        ? res.json(updateUser)
        : res.status(404).json(new ApiError('user not found', 404, true));
    } catch (err) {
      console.error(err);
      return res.status(500).send(new ApiError('Error in DB', 500, true));
    }
  } else if (userIndex === -1) {
    res.status(404).json(new ApiError('User not found', 404, true));
  } else {
    res.status(404).json(new ApiError('give user data', 404, true));
  }
};

export const deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user?.avatar) {
      await deleteFromCloud(user.avatar);
    }
    return user
      ? res.status(204).send()
      : res.status(404).json(new ApiError('user not found', 404, true));
  } catch (err) {
    console.error(err);
    return res.status(500).send(new ApiError('Error in DB', 500, true));
  }
};
