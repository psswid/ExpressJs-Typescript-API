import supertest from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import { createUserSessionHandler } from "../controller/session.controller";

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();

export const userPayload = {
  _id: userId,
  email: "test@example.com",
  name: "John Doe",
};

export const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2024-03-01T12:00:00.00.000Z"),
  updatedAt: new Date("2024-03-01T12:00:00.00.000Z"),
  __v: 0,
};

const userInput = {
  name: "John Doe",
  email: "test@example.com",
  password: "TestPass123",
  passwordConfirmation: "TestPass123",
};

describe("user", () => {
  describe("given the username and password are valid", () => {
    it("should return the user payload", async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, "createUser")
        // @ts-ignore
        .mockReturnValueOnce(userPayload);

      const { statusCode, body } = await supertest(app)
        .post("/api/users")
        .send(userInput);
      expect(statusCode).toBe(200);
      expect(body).toEqual(userPayload);
      expect(createUserServiceMock).toHaveBeenLastCalledWith(userInput);
    });
  });

  describe("given the password do not match", () => {
    it("should return a 400", async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, "createUser")
        // @ts-ignore
        .mockReturnValueOnce(userPayload);

      const { statusCode } = await supertest(app)
        .post("/api/users")
        .send({ ...userInput, passwordConfirmation: "falsePassword" });
      expect(statusCode).toBe(400);
      expect(createUserServiceMock).not.toHaveBeenCalled();
    });
  });

  describe("given the user service throws", () => {
    it("should return 409", async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, "createUser")
        .mockRejectedValue("Noooooooo");

      const { statusCode } = await supertest(app)
        .post("/api/users")
        .send(userInput);
      expect(statusCode).toBe(409);
      expect(createUserServiceMock).toHaveBeenCalled();
    });
  });

  describe("create user session", () => {
    describe("given the username and password are valid", () => {
      it("should return a signed accessToken and refreshToken", async () => {
        jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return "user agent";
          },
          body: {
            email: "test@example.com",
            password: "TestPass123",
          },
        };

        const send = jest.fn();
        const res = {
          send,
        };

        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
