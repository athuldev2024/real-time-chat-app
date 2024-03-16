import UserModel from "@models/user-model";
import bcrypt from "bcryptjs";
import { matchedData } from "express-validator";
import { customAlphabet } from "nanoid";
import statusCodes from "@constants/status-codes";

const SALT = 10;
const ID_SIZE = 5;

const registerUser = async (req, res, next) => {
  try {
    const nanoid = customAlphabet("1234567890", ID_SIZE);
    const { username, password, mobile, email } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, SALT);
    const id = nanoid();

    await UserModel.create({
      id,
      email: email.toLowerCase(),
      username,
      password,
      hashed: hashedPassword,
      mobile,
    });

    return res.redirect(`/api/users/authenticate/${statusCodes.CREATED}/${id}`);
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
      return res.redirect(
        `/api/users/authenticate/${statusCodes.SUCCESS}/${user.id}`
      );
    }

    res
      .status(statusCodes.NOT_AUTHENTICATED)
      .json({ message: "Unauthorized access." });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = matchedData(req);

    await UserModel.deleteOne({ id });

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
      ...(updateDetails.password && {
        hashed: await bcrypt.hash(updateDetails.password, SALT),
      }),
      ...(updateDetails.email && { email: updateDetails.email.toLowerCase() }),
      ...(updateDetails.dob ? { dob: new Date(updateDetails.dob) } : {}),
    };

    await UserModel.findOneAndUpdate({ id: updateDetails.id }, updateToDB);

    return res.status(statusCodes.UPDATED).json({ message: "User updated." });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = matchedData(req);

    const user = await UserModel.findOne({
      id,
    });

    if (user) {
      return res.status(statusCodes.SUCCESS).json({
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password,
        mobile: user.mobile,
      });
    } else {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: "No user found." });
    }
  } catch (error) {
    next(error);
  }
};

export { loginUser, registerUser, deleteUser, updateUser, getUser };
