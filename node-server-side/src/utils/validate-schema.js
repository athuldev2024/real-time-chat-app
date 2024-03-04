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
