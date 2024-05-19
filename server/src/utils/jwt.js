import jwt from "jsonwebtoken";

const getUser = (token) => {
  try {
    if (token) {
      console.log("autozation sucessfully");
      return jwt.verify(token, process.env.SECRET_KEY);
    }
    return null;
  } catch (error) {
    console.log("error get user", error);
  }
};

export default getUser;
