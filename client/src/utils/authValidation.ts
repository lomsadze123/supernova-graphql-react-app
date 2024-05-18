import * as z from "zod";

const authValidation = () => {
  const emailSchema = z.string().email();
  const passwordSchema = z.string().min(8);
  const usernameSchema = z.string().min(3);

  const signUpSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    username: usernameSchema,
  });

  const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  });

  return { signInSchema, signUpSchema };
};

export default authValidation;
