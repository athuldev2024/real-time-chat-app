import UserModel from "@models/user-model";
import bcrypt from "bcryptjs";
import { matchedData } from "express-validator";
import { customAlphabet } from "nanoid";
import statusCodes from "@constants/status-codes";

const SALT = 10;

const registerUser = async (req, res, next) => {
  try {
    const nanoid = customAlphabet("1234567890", 18);
    const { username, password, mobile, email, gender, dob } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, SALT);

    await UserModel.create({
      id: nanoid(),
      email: email.toLowerCase(),
      username,
      password,
      hashed: hashedPassword,
      mobile,
      gender,
      dob: new Date(dob),
    });

    return res.redirect(`/api/users/authenticate/${statusCodes.CREATED}`);
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
      return res.redirect(`/api/users/authenticate/${statusCodes.SUCCESS}`);
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
      ...(updateDetails.password && {
        hashed: await bcrypt.hash(updateDetails.password, SALT),
      }),
      ...(updateDetails.email && { email: updateDetails.email.toLowerCase() }),
      ...(updateDetails.dob ? { dob: new Date(updateDetails.dob) } : {}),
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
