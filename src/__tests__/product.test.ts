import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "Title of test product",
  description:
    "Description of test product Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  price: 99.0,
  image: "https://i.imgur.com/test.jpg",
};

export const userPayload = {
  _id: userId,
  email: "testuser@example.com",
  name: "Test user",
};

describe("product", () => {
  /**
   * Overkill testing version, course suggest to mock services
   */
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const productId = "product-123";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("given the product does exist", () => {
      it("should return a 200 and product", async () => {
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );
        expect(statusCode).toBe(200);
        expect(body.productId).toBe(product.productId);
      });
    });
  });

  describe("create product route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/products");

        expect(statusCode).toBe(403);
      });
    });
    describe("given the user is logged in", () => {
      it("should return a 200 and create the product", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/products")
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description:
            "Description of test product Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          image: "https://i.imgur.com/test.jpg",
          price: 99,
          productId: expect.any(String),
          title: "Title of test product",
          updatedAt: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });
});
