import bcrypt from "bcryptjs";
import statusCodes from "@constants/status-codes";
import messages from "@constants/message";
import { matchedData, validationResult } from "express-validator";
import db from "@models";

const SALT = 10;

const registerUser = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (validationErrors?.errors && validationErrors?.errors?.length > 0)
      return res
        .status(statusCodes.INVALID_REQUEST)
        .json({ errors: validationErrors.array() });

    const { username, password, mobile, email } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, SALT);

    const checkIfExists = await db.user.findOne({
      where: {
        mobile: String(mobile),
      },
    });

    if (checkIfExists)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_ALREADY_EXISTS });

    await db.user.create({
      email: email.toLowerCase(),
      username,
      password,
      hashed: hashedPassword,
      mobile: String(mobile),
    });

    return res.status(statusCodes.CREATED).json({
      message: messages.USER_CREATED,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (validationErrors?.errors && validationErrors?.errors?.length > 0)
      return res
        .status(statusCodes.INVALID_REQUEST)
        .json({ errors: validationErrors.array() });

    const { mobile, password } = matchedData(req);

    const existingUser = await db.user.findOne({
      where: {
        mobile: String(mobile),
      },
    });

    if (!existingUser)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_NOT_ALREADY_EXISTS });

    const match = await bcrypt.compare(
      password,
      existingUser?.dataValues?.hashed
    );

    if (!match)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.FAILURE });

    return res.status(statusCodes.SUCCESS).json({
      message: messages.LOGGED_IN,
      identifier: existingUser?.dataValues?.identifier,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { identifier } = matchedData(req);

    const existingUser = await db.user.findOne({
      where: {
        identifier: identifier,
      },
    });

    if (!existingUser)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_NOT_ALREADY_EXISTS });

    await db.user.destroy({ where: { identifier: identifier } });

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

    await db.user.update(updateToDB, { where: { id: updateDetails.id } });

    return res
      .status(statusCodes.UPDATED)
      .json({ message: messages.USER_UPDATED });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { identifier } = matchedData(req);

    const existingUser = await db.user.findOne({
      where: {
        identifier: identifier,
      },
    });

    if (!existingUser)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_NOT_ALREADY_EXISTS });

    if (existingUser?.dataValues) {
      return res.status(statusCodes.SUCCESS).json({
        identifier: existingUser?.dataValues?.identifier,
        email: existingUser?.dataValues?.email,
        username: existingUser?.dataValues?.username,
        password: existingUser?.dataValues?.password,
        mobile: existingUser?.dataValues?.mobile,
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
