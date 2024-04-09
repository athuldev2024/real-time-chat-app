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
  errorMessage: "Invalid ID",
  optional: false,
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

const messageSchema = {
  id: identifier,
  message: {
    notEmpty: true,
    isString: true,
    errorMessage: "Invalid message",
  },
};
export const chatValidationSchema = {
  myid: identifier,
  hisid: identifier,
  myusername: { ...username, optional: false },
  hisusername: { ...username, optional: false },
  message: messageSchema,
};
