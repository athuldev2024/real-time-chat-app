const username = {
  isLength: {
    options: {
      min: 5,
      max: 32,
    },
  },
  notEmpty: true,
  isString: true,
  errorMessage: "Invalid username",
};

const password = {
  notEmpty: true,
  isString: true,
  errorMessage: "Invalid password",
};

const email = {
  notEmpty: true,
  isEmail: true,
  errorMessage: "Invalid email",
};

const mobile = {
  notEmpty: true,
  isInt: true,
  errorMessage: "Invalid mobile",
};

const identifier = {
  notEmpty: true,
  isInt: true,
  errorMessage: "Invalid identifier",
  optional: false,
};

const message = {
  notEmpty: true,
  isString: true,
  errorMessage: "Invalid user message",
};

export const createUserValidationSchema = {
  username: { ...username, optional: false },
  password: { ...password, optional: false },
  email: { ...email, optional: false },
  mobile: { ...mobile, optional: false },
};

export const patchUserValidationSchema = {
  username: { ...username, optional: true },
  password: { ...password, optional: true },
  email: { ...email, optional: true },
  mobile: { ...mobile, optional: true },
};

export const pingValidationSchema = {
  sender: { ...identifier, optional: false },
  receiver: { ...identifier, optional: false },
  message: { ...message, optional: false },
};
