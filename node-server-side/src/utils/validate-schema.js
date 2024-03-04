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

const gender = {
  notEmpty: true,
  isString: true,
  errorMessage: "Invalid gender",
};

const dob = {
  notEmpty: true,
  isString: true,
  errorMessage: "Invalid DOB",
};

export const createUserValidationSchema = {
  username: { ...username, optional: false },
  password: { ...password, optional: false },
  email: { ...email, optional: false },
  mobile: { ...mobile, optional: false },
  gender: { ...gender, optional: false },
  dob: { ...dob, optional: false },
};

export const patchUserValidationSchema = {
  username: { ...username, optional: true },
  password: { ...password, optional: true },
  email: { ...email, optional: true },
  mobile: { ...mobile, optional: true },
  gender: { ...gender, optional: true },
  dob: { ...dob, optional: true },
};
