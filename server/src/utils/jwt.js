import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getUser = async (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.log("error get user", error);
    return null;
  }
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "40s" });
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export { getUser, generateToken, hashPassword };
