import {
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
  getAllUsersExceptMe,
} from "@controllers/user-controllers";
import db from "@models";
import statusCodes from "@constants/status-codes";
import messages from "@constants/message";
import bcrypt from "bcryptjs";

const MOCK_USER = {
  email: "test@gmail.com",
  username: "test",
  password: "password",
  mobile: 123456789,
};

jest.mock("@models", () => {
  return {
    sequelize: jest.fn(),
    user: jest.fn(),
    upload: jest.fn(),
    ping: jest.fn(),
  };
});

jest.mock("express-validator", () => {
  const original = jest.requireActual("express-validator");

  return {
    ...original,
    matchedData: jest.fn(() => MOCK_USER),
  };
});

const mockRequest = {};
const mockResponse = {
  sendStatus: jest.fn(),
  send: jest.fn(),
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
  redirect: jest.fn(),
};
const nextMock = jest.fn();
const errMessage = "Async error message!";

describe("register user", () => {
  test("user register - user already exists", async () => {
    db.user.findOne = jest.fn().mockResolvedValue(true);
    await registerUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: messages.USER_ALREADY_EXISTS,
    });
  });

  test("user register - success", async () => {
    db.user.findOne = jest.fn().mockResolvedValue(false);
    db.user.create = jest.fn().mockResolvedValue(
      Promise.resolve({
        createUpload: jest.fn(),
      })
    );

    await registerUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: messages.USER_CREATED,
    });
  });

  test("user register - error", async () => {
    db.user.findOne = jest.fn().mockRejectedValue(new Error(errMessage));
    await registerUser(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});

describe("delete user", () => {
  test("user delete - user does not exist", async () => {
    db.user.findOne = jest.fn().mockResolvedValue(false);
    await deleteUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: messages.USER_NOT_EXISTS,
    });
  });

  test("user delete - success", async () => {
    db.user.findOne = jest.fn().mockResolvedValue(true);
    db.user.destroy = jest.fn();
    await deleteUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.DELETED);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: messages.USER_DELETED,
    });
  });

  test("user delete - error", async () => {
    db.user.findOne = jest.fn().mockRejectedValue(new Error(errMessage));
    await deleteUser(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});

describe("update user", () => {
  test("user update - user does not exist", async () => {
    db.user.findOne = jest.fn().mockResolvedValue(false);
    await updateUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: messages.USER_NOT_EXISTS,
    });
  });

  test("user update - success", async () => {
    db.user.findOne = jest.fn().mockResolvedValue(true);
    db.user.update = jest.fn();
    await updateUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.UPDATED);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
  });

  test("user update - error", async () => {
    db.user.findOne = jest.fn().mockRejectedValue(new Error(errMessage));
    await updateUser(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});

describe("login user", () => {
  test("user login - user does not exist", async () => {
    db.user.findOne = jest.fn().mockResolvedValue(false);
    await loginUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: messages.USER_NOT_EXISTS,
    });
  });

  test("user login - wrong password", async () => {
    const SALT = 10;
    db.user.findOne = jest.fn().mockResolvedValue({
      dataValues: {
        hashed: await bcrypt.hash("wrong password", SALT),
        identifier: 101,
      },
    });
    await loginUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.CONFLICT);
  });

  test("user login - success - right password", async () => {
    const SALT = 10;
    const existingUser = {
      dataValues: {
        hashed: await bcrypt.hash("password", SALT),
        identifier: 101,
      },
    };
    db.user.findOne = jest.fn().mockResolvedValue(existingUser);
    await loginUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.SUCCESS);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: messages.LOGGED_IN,
      identifier: existingUser?.dataValues?.identifier,
      userDetails: existingUser?.dataValues,
    });
  });

  test("user login - error", async () => {
    db.user.findOne = jest.fn().mockRejectedValue(new Error(errMessage));
    await loginUser(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});

describe("getAllUsersExceptMe", () => {
  test("getAllUsersExceptMe - success", async () => {
    db.user.findAll = jest.fn().mockResolvedValue({});
    await getAllUsersExceptMe(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.SUCCESS);
    expect(mockResponse.json).toHaveBeenCalledWith({ allUsers: {} });
  });

  test("getAllUsersExceptMe - error", async () => {
    db.user.findAll = jest.fn().mockRejectedValue(new Error(errMessage));
    await getAllUsersExceptMe(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});
