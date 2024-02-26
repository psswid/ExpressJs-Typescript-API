import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    password: string({
      required_error: "Password required",
    }),
    email: string({
      required_error: "Email required",
    }),
  }),
});
