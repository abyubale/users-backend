import {
  EMAIL_REGEX,
  FIRST_NAME_REGEX,
  LAST_NAME_REGEX,
  MOBILE_VALID_REGEX,
} from '../constant.js';

export const isMobileValid = (phone) => MOBILE_VALID_REGEX.test(phone);

export const isFirstNameValid = (first_name) =>
  FIRST_NAME_REGEX.test(first_name);

export const isLastNameValid = (last_name) => LAST_NAME_REGEX.test(last_name);

export const isEmailValid = (email) => EMAIL_REGEX.test(email);
