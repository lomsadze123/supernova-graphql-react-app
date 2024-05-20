import jwt from "jsonwebtoken";

const getUser = async (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.log("error get user", error);
    return null;
  }
};

export default getUser;
