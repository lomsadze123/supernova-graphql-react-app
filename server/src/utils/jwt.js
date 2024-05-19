import jwt from "jsonwebtoken";

const getUser = async (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY);
    }
    return null;
  } catch (error) {
    console.log("error get user", error);
  }
};

export default getUser;
