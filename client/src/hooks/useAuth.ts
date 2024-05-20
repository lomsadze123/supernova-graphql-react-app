import { useState } from "react";
import { useForm } from "react-hook-form";
import authValidation from "../utils/authValidation";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../actions/userActions/userMutations";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/userContext";
import { ZodIssue } from "zod";

const useAuth = () => {
  const { setToken, refetchGlobal } = useUserContext();
  const [formType, setFormType] = useState("signin");
  const { userCredentialsSchema } = authValidation();
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      setToken(createUser.token);
      localStorage.setItem("token", createUser.token);
      refetchGlobal();
    },
  }); // , { loading, error }
  const [loginUser, { error: loginUserError }] = useMutation(LOGIN_USER, {
    onCompleted: ({ loginUser }) => {
      setToken(loginUser.token);
      localStorage.setItem("token", loginUser.token);
      refetchGlobal();
    },
    onError: (error) => {
      // Handle login user error here
      console.error("Error logging in user:", error);
      // You can set an error state or display an error message
    },
  });
  const navigate = useNavigate();
  const { handleSubmit, register, reset, trigger } = useForm();

  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const handleCreateUser = (data: any) => {
    createUser({ variables: { input: data } });
  };

  const handleLoginUser = (data: any) => {
    loginUser({ variables: { input: data } });
  };

  if (loginUserError) {
    console.log("login error", loginUserError);
  }

  const onSubmit = async (data: any) => {
    try {
      await trigger();
      const result = userCredentialsSchema.safeParse(data);
      console.log(result.success);

      if (result.success) {
        setErrors([]);
        if (formType === "signin") {
          handleLoginUser(data);
          reset();
        } else {
          handleCreateUser(data);
          reset();
        }
        navigate("/home");
      } else {
        console.log("Form contains errors, please fix them before submitting");
        console.log(result.error.errors);
        setErrors(result.error.errors);
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
    loginUserError,
  };
};

export default useAuth;
