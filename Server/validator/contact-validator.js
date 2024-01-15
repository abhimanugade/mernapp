const { z } = require("zod");

const contactSchema = z.object({
  userName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 char" })
    .max(255, { message: "Name must not more than 255char" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email Address" })
    .min(10, { message: "Email must be atleast 10 char" })
    .max(255, { message: "Email must not more than 255 char" }),
  message: z
    .string({ required_error: "message is required" })
    .trim()
    .min(10, { message: "message must be atleast 10 char" })
    .max(255, { message: "message must not more than 255 char" }),
});

module.exports = { contactSchema };
