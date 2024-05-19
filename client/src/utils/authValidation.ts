import * as z from "zod";

const authValidation = () => {
  const emailSchema = z.string().email("Email is required and must be valid.");
  const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters long.");

  const userCredentialsSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  });

  return { userCredentialsSchema };
};

export default authValidation;
