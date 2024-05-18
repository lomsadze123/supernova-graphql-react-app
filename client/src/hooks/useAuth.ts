import { useState } from "react";
import { useForm } from "react-hook-form";
import authValidation from "../utils/authValidation";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../actions/userActions/userMutations";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [formType, setFormType] = useState("signin");
  const { signInSchema, signUpSchema } = authValidation();
  const [createUser] = useMutation(CREATE_USER); // , { loading, error }
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const getToken = () => localStorage.getItem("token");

  const onSubmit = async (data: any) => {
    try {
      await trigger();
      const schema = formType === "signin" ? signInSchema : signUpSchema;
      const result = schema.safeParse(data);
      if (result.success) {
        if (formType === "signin") {
          const response = await loginUser({
            variables: { input: data },
            context: { headers: { Authorization: `Bearer ${getToken()}` } },
          });
          console.log("Logged in:", response.data.loginUser);
          const { token, user } = response.data.loginUser;
          localStorage.setItem("token", token);
          localStorage.setItem(
            "user",
            JSON.stringify({ id: user.id, email: user.email })
          );

          reset();
          navigate("/home");
        } else {
          const response = await createUser({ variables: { input: data } });
          console.log("User created:", response.data.createUser);
          reset();
          navigate("/home");
        }
      } else {
        console.log("Form contains errors, please fix them before submitting");
        console.log(result.error.errors);
      }
    } catch (error) {
      console.log("onsubmit error", error);
    }
  };
  return {
    setFormType,
    handleSubmit: handleSubmit(onSubmit),
    register,
    reset,
    formType,
    errors,
  };
};

export default useAuth;
