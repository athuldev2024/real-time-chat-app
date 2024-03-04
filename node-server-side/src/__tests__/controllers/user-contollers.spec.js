import {
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
} from "@controllers/user-controllers";
import UserModel from "@models/user-model";
import statusCodes from "@constants/status-codes";
import bcrypt from "bcryptjs";

jest.mock("express-validator", () => {
  const original = jest.requireActual("express-validator");

  return {
    ...original,
    matchedData: jest.fn(() => ({
      email: "test@gmail.com",
      username: "test",
      password: "password",
      mobile: 123456789,
      gender: "M",
      dob: "09/17/1990",
    })),
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
const errMessage = "Async error message";

describe("register user", () => {
  test("user register - success", async () => {
    UserModel.create = jest.fn().mockResolvedValue(42);
    await registerUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.redirect).toHaveBeenCalledTimes(1);
  });

  test("user register - failure", async () => {
    UserModel.create = jest.fn().mockRejectedValue(new Error(errMessage));
    await registerUser(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});

describe("delete user", () => {
  test("user delete - success", async () => {
    UserModel.deleteOne = jest.fn().mockResolvedValue(42);
    await deleteUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.DELETED);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
    expect(mockResponse.send).toHaveBeenCalledWith("User deleted.");
  });

  test("user delete - failure", async () => {
    UserModel.deleteOne = jest.fn().mockRejectedValue(new Error(errMessage));
    await deleteUser(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});

describe("update user", () => {
  test("user update - success", async () => {
    UserModel.findOneAndUpdate = jest.fn().mockResolvedValue(42);
    await updateUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.UPDATED);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
  });

  test("user update - failure", async () => {
    UserModel.findOneAndUpdate = jest
      .fn()
      .mockRejectedValue(new Error(errMessage));
    await updateUser(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});

describe("login user", () => {
  test("user login - success", async () => {
    const SALT = 10;
    UserModel.findOne = jest
      .fn()
      .mockResolvedValue({ hashed: await bcrypt.hash("password", SALT) });
    await loginUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.redirect).toHaveBeenCalledTimes(1);
  });

  test("user login - wrong password", async () => {
    const SALT = 10;
    UserModel.findOne = jest
      .fn()
      .mockResolvedValue({ hashed: await bcrypt.hash("passwordOne", SALT) });
    await loginUser(mockRequest, mockResponse, nextMock);
    expect(mockResponse.status).toHaveBeenCalledWith(
      statusCodes.NOT_AUTHENTICATED
    );
  });

  test("user login - failure", async () => {
    UserModel.findOne = jest.fn().mockRejectedValue(new Error(errMessage));
    await loginUser(mockRequest, mockResponse, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new Error(errMessage));
  });
});
