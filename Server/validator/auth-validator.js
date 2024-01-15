const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email Address" })
    .min(3, { message: "Email must be atleast 3 char" })
    .max(255, { message: "Email must not more than 255 char" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(7, { message: "password must be atleast 7 char" })
    .max(1024, { message: "password must not more than 1024char" }),
});

//object Schema
const signupSchema = loginSchema.extend({
  userName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 char" })
    .max(255, { message: "Name must not more than 255char" }),

  phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10 degit" })
    .max(20, { message: "Phone must not more than 20 degit" }),
});

module.exports = { signupSchema, loginSchema };
