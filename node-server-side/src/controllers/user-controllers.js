import UserModel from "@models/user-model";
import bcrypt from "bcryptjs";
import { matchedData } from "express-validator";
import { customAlphabet } from "nanoid";
import statusCodes from "@constants/status-codes";

const SALT = 10;

const registerUser = async (req, res, next) => {
  try {
    const nanoid = customAlphabet("1234567890", 18);
    const { username, password, mobile, email } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, SALT);

    await UserModel.create({
      id: nanoid(),
      email: email.toLowerCase(),
      username,
      password,
      hashed: hashedPassword,
      mobile,
    });

    const jsonStr = JSON.stringify({
      username,
      password,
      email,
      mobile,
    });

    return res.redirect(
      `/api/users/authenticate/${statusCodes.CREATED}/${jsonStr}`
    );
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = matchedData(req);

    const user = await UserModel.findOne({
      username,
    });

    if (user && (await bcrypt.compare(password, user?.hashed))) {
      const jsonStr = JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email,
        mobile: user.mobile,
      });
      return res.redirect(
        `/api/users/authenticate/${statusCodes.SUCCESS}/${jsonStr}`
      );
    }

    res
      .status(statusCodes.NOT_AUTHENTICATED)
      .json({ message: "Unauthorized access." });
  } catch (error) {
    console.log("Error: ", error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { mobile } = matchedData(req);

    await UserModel.deleteOne({ mobile });

    return res.status(statusCodes.DELETED).send("User deleted.");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updateDetails = matchedData(req);

    const updateToDB = {
      ...updateDetails,
      hashed: await bcrypt.hash(updateDetails.password, SALT),
      email: updateDetails.email.toLowerCase(),
    };

    await UserModel.findOneAndUpdate(
      { mobile: updateDetails.mobile },
      updateToDB
    );

    return res.status(statusCodes.UPDATED).json({ message: "User updated." });
  } catch (error) {
    next(error);
  }
};

export { loginUser, registerUser, deleteUser, updateUser };
