export const FIRST_NAME_REGEX = /^[A-Za-z]{1,30}$/;

export const LAST_NAME_REGEX = /^[A-Za-z]{1,30}([-']?[A-Za-z]{1,30})?$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const MOBILE_VALID_REGEX =
  /^\+?(\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/;
