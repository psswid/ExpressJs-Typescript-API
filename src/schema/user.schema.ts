import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name required",
    }),
    password: string({
      required_error: "Password required",
    }).min(6, "Password too short, must be 6+ chars"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation if required",
    }),
    email: string({
      required_error: "Email required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
