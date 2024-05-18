import { useState } from "react";
import { useForm } from "react-hook-form";
import authValidation from "../utils/authValidation";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../actions/userActions/userMutations";

const useAuth = () => {
  const [formType, setFormType] = useState("signin");
  const { signInSchema, signUpSchema } = authValidation();
  const [createUser] = useMutation(CREATE_USER); // , { loading, error }
  const [loginUser] = useMutation(LOGIN_USER);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await trigger();
      const schema = formType === "signin" ? signInSchema : signUpSchema;
      const result = schema.safeParse(data);
      if (result.success) {
        if (formType === "signin") {
          const response = await loginUser({ variables: { input: data } });
          console.log("Logged in:", response.data.loginUser);
          localStorage.setItem("token", response.data.loginUser.token);
          reset();
        } else {
          const response = await createUser({ variables: { input: data } });
          console.log("User created:", response.data.createUser);
          reset();
          // Optionally redirect user or display success message
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
